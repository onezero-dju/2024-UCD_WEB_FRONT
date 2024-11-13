import { React, useState, useEffect, useCallback, useMemo, memo } from 'react'
import './Editor.css'
import axios from 'axios';

import { EventSourcePolyfill } from 'event-source-polyfill';

import { ProfileImage } from '../ProfileImage/ProfileImage';


// TipTap extension
// StarterKit
import StarterKit from '@tiptap/starter-kit'
// document
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
// Highlight
import Highlight from '@tiptap/extension-highlight'
// List
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
// horizontalRule
import HorizontalRule from '@tiptap/extension-horizontal-rule'
// CodeBlock
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// Image
import Image from '@tiptap/extension-image'
// collaborative
import Dropcursor from '@tiptap/extension-dropcursor'
import { all, createLowlight } from 'lowlight'
// detail
import Details from '@tiptap-pro/extension-details'
import DetailsContent from '@tiptap-pro/extension-details-content'
import DetailsSummary from '@tiptap-pro/extension-details-summary'
// File
import FileHandler from '@tiptap-pro/extension-file-handler'
// Commands
import Commands from "./suggestion/commands.js";
import getSuggestionItems from "./suggestion/items.js";
import renderItems from "./suggestion/renderItems.jsx";
import { TextSelection } from '@tiptap/pm/state'
// Table
import { getHierarchicalIndexes, TableOfContents } from '@tiptap-pro/extension-table-of-contents'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
// TaskItem
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

/*
@tiptap/extension-character-count
@tiptap/extension-focus
@tiptap/extension-font-family
@tiptap/extension-heading

@tiptap/extension-link
@tiptap/extension-ordered-list
@tiptap/extension-subscript
@tiptap/extension-superscript

@tiptap/extension-task-item
@tiptap/extension-task-list
@tiptap/extension-text-align
@tiptap/extension-underline
*/
/*
@tiptap-pro/extension-drag-handle-react
@tiptap-pro/extension-mathematics
@tiptap-pro/extension-node-range


@tiptap-pro/extension-unique-id
*/

import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'

// collaboration
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'


import { BubbleMenu,FloatingMenu,EditorContent, useEditor } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import {WebsocketProvider} from 'y-websocket'
import * as Y from 'yjs'

const ydoc = new Y.Doc();
const provider = new WebsocketProvider('ws://localhost:1234','10', ydoc);
console.log(provider);
const awareness = provider.awareness;




// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all)



const ToCItem = ({ item, onItemClick }) => {
  return (
    <div className={`${item.isActive && !item.isScrolledOver ? 'is-active' : ''} ${item.isScrolledOver ? 'is-scrolled-over' : ''}`} style={{
      '--level': item.level,
    }}>
      <a href={`#${item.id}`} onClick={e => onItemClick(e, item.id)} data-item-index={item.itemIndex}>{item.textContent}</a>
    </div>
  )
}

const ToCEmptyState = () => {
  return (
    <div className="empty-state">
      <p>Start editing your document to see the outline.</p>
    </div>
  )
}

const ToC = ({
  items = [],
  editor,
}) => {
  if (items.length === 0) {
    return <ToCEmptyState />
  }

  const onItemClick = (e, id) => {
    e.preventDefault()

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`)
      const pos = editor.view.posAtDOM(element, 0)

      // set focus
      const tr = editor.view.state.tr

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)))

      editor.view.dispatch(tr)

      editor.view.focus()

      if (history.pushState) { // eslint-disable-line
        history.pushState(null, null, `#${id}`) // eslint-disable-line
      }

      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      {items.map((item, i) => (
        <ToCItem onItemClick={onItemClick} key={item.id} item={item} index={i + 1} />
      ))}
    </>
  )
}
const MemorizedToC = memo(({editor, items})=>{return <ToC editor={editor} items={items}/>})
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
let color=getRandomColor();
awareness.on('change', changes => {
  // Whenever somebody updates their awareness information,
  // we log all awareness information from all users.
  console.log(Array.from(awareness.getStates().values()))
})
export default (props) => {
  const [items, setItems] = useState([])
  awareness.setLocalStateField('user', {
    // Define a print name that should be displayed
    username: props.username,
    // Define a color that should be associated to the user:
    color: color, // should be a hex color
    name: props.username
  })

  



  const fetchSSE = async() => {
    const eventSource = await new EventSourcePolyfill(`http://localhost:8000/sse/${10}`, {
			headers:{
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdCIsInN1YiI6InRlc3QiLCJqdGkiOiIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTczMDkwNDIxNywiZXhwIjoxNzM5NTQ0MjE3fQ.IZwtyMmpWI5PJPLAoK0WMqlmeXFm2dSLdEQEo8JuBho`
      },
    });
    eventSource.onopen = () => {
      // 연결 시 할 일
    };

    eventSource.onmessage = async (e) => {
      const res = await e.data;
      const parsedData = JSON.parse(res);

      console.log(parsedData);
    };

    eventSource.onerror = (e) => {
      // 종료 또는 에러 발생 시 할 일
      eventSource.close();

      if (e.error) {
        // 에러 발생 시 할 일
      }

      if (e.target.readyState === EventSource.CLOSED) {
        // 종료 시 할 일
      }
    };
  };
  useEffect(()=>{
  },[])
  useEffect(()=>{
    fetchSSE();
    reqRealtime();
},[])
  const reqRealtime = async()=>{
    await axios.get('http://localhost:8000/realtime/info/10',{
      responseType: 'arraybuffer',
      headers:{
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdCIsInN1YiI6InRlc3QiLCJqdGkiOiIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTczMDkwNDIxNywiZXhwIjoxNzM5NTQ0MjE3fQ.IZwtyMmpWI5PJPLAoK0WMqlmeXFm2dSLdEQEo8JuBho`
      }
    })  // 바이너리 데이터 요청
    .then(res => {
      // 서버가 바이너리 데이터로 응답할 경우
      const byteArray = new Uint8Array(res.data);

      if (byteArray.length === 0) {
        console.log('Received empty update');
        return;
      }

      console.log('Received update:', byteArray);

      // Yjs 문서에 업데이트 적용
      // Y.applyUpdate(byteArray);
      Y.logUpdate(byteArray)

      // const stateVector = Y.encodeStateVector(byteArray)

      // const diff = Y.encodeStateAsUpdate(ydoc, stateVector)
      Y.applyUpdate(ydoc, byteArray)
      // Y.encodeStateAsUpdate(byteArray)
    })
    .catch(err => {
      console.log(err);
    });
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: 'editor-paragraph',
        },
      }),
      Text,
      Highlight,
      Typography,
      BulletList,
      ListItem,
      HorizontalRule,
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Dropcursor,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
      }),
      Details.configure({
        persist: true,
        HTMLAttributes: {
          class: 'details',
        },
      }),
      DetailsSummary,
      DetailsContent,
      Placeholder.configure({
        includeChildren: true,
        placeholder: ({ node }) => {
          if (node.type.name === 'detailsSummary') {
            return 'Summary'
          }

          return '입력하기'
        },
      }),
      // Suggestion,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent) // eslint-disable-line no-console
              return false
            }

            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
      }),
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(content) {
          setItems(content)
        },
      }),
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems
        }
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
  })
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])
  const MenuBar = ({editor}) => {
  
    if (!editor) {
      return null
    }
  
    return (
      <div className="control-group">
        <div className="button-group">
          <button
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
              }
            >
            Insert table
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            Code
          </button>
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            Clear marks
          </button>
          <button onClick={() => editor.chain().focus().clearNodes().run()}>
            Clear nodes
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
            Paragraph
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
          >
            H4
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
          >
            H5
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
          >
            H6
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            Ordered list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            Code block
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            Blockquote
          </button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            Horizontal rule
          </button>
          <button onClick={() => editor.chain().focus().setHardBreak().run()}>
            Hard break
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
          >
            Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
          >
            Redo
          </button>
          <button
            onClick={() => editor.chain().focus().setColor('#958DF1').run()}
            className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
          >
            Purple
          </button>
          <button onClick={addImage}>Set image</button>
          <button onClick={() => editor.chain().focus().setDetails().run()} disabled={!editor.can().setDetails()}>
            Set details
          </button>
          <button onClick={() => editor.chain().focus().unsetDetails().run()} disabled={!editor.can().unsetDetails()}>
            Unset details
          </button>
        </div>
      </div>
    )
  }
  
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]
  return (
    <>
      {/* <div>
        <MenuBar editor={editor}/>
        
      </div> */}
      <ul className='participants'>
        {
          Array.from(awareness.getStates().values())?.map((it, idx)=>{
            if(!(it.user?.name))return;
            return(
              <li>
                  <ProfileImage name={it.user?.username} color={it.user?.color} size='large'/>
              </li>
            )
          })
        }
      </ul>
      <EditorContent editor={editor}/>
      
      {/* <div className="sidebar">
        <div className="sidebar-options">
          <div className="label-large">목차</div>
          <div className="table-of-contents">
            <MemorizedToC editor={editor} items={items} />
          </div>
        </div>
      </div> */}

      <>
        {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
          {
            editor.isActive('table')&&<>
              <button onClick={() =>{editor.chain().focus().addColumnBefore().run()}}>열 이전 추가</button>
              <button onClick={() => editor.chain().focus().addColumnAfter().run()}>열 이후 추가</button>
              <button onClick={() => editor.chain().focus().deleteColumn().run()}>열 삭제</button>
              <button onClick={() => editor.chain().focus().addRowBefore().run()}>행 이전 추가</button>
              <button onClick={() => editor.chain().focus().addRowAfter().run()}>행 이후 추가</button>
              <button onClick={() => editor.chain().focus().deleteRow().run()}>행 삭제</button>
              <button onClick={() => editor.chain().focus().deleteTable().run()}>표 삭제</button>
              <button onClick={() => editor.chain().focus().mergeCells().run()}>셀 병합</button>
              <button onClick={() => editor.chain().focus().splitCell().run()}>셀 분할</button>
              <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split</button>
            </>
          }
        </BubbleMenu>
        }

        {/* {editor && <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet list
          </button>
          
        </FloatingMenu>} */}
      </>
    </>
  )
}


