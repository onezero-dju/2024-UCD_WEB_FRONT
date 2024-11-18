const getSuggestionItems = (query) => {
  console.log(query);
  return [
    {
      title: "H1",
      element:"제목1",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      }
    },
    {
      title: "H2",
      element:"제목2",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      }
    },
    {
      title: "Text",
      element:"본문",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .clearNodes()
          .run();
      }
    },
    // {
    //   title: "bold",
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().deleteRange(range).setMark("bold").run();
    //   }
    // },
    // {
    //   title: "italic",
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().deleteRange(range).setMark("italic").run();
    //   }
    // },
    {
      title: "Table",
      element:"표",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      }
    },
    {
      title: "Task",
      element:"할 일",
      command:({editor, range}) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      }
    },
    {
      title: "CodeBlock",
      element:"코드블록",
      command:({editor, range}) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
      }
    }
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.query.toLowerCase()))
    .slice(0, 10);
};

export default getSuggestionItems;
