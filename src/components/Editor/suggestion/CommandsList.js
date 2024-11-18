import React, { Component } from "react";
import { LuHeading1, LuHeading2 } from "react-icons/lu";

import { PiTextHOneBold, PiTextHTwoBold, PiTextTBold, PiTableBold, PiCodeBold, PiCheckSquareBold } from "react-icons/pi";

class CommandList extends Component {
  setIcon(value){
    switch (value) {
      case "H1":
        return <PiTextHOneBold/>;
    
      case "H2":
        return <PiTextHTwoBold/>;
    
      case "Text":
        return <PiTextTBold/>;
    
      case "Table":
        return <PiTableBold/>;
    
      case "CodeBlock":
        return <PiCodeBold/>;
    
      case "Task":
        return <PiCheckSquareBold/>;
    
      default:
        break;
    }
  }

  state = {
    selectedIndex: 0
  };

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0
      });
    }
  }

  onKeyDown({ event }) {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length
    });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index];

    if (item) {
      this.props.command(item);
    }
  }

  render() {
    const { items } = this.props;
    return (
      <div className="items">
        {items.map((item, index) => {
          return (
            <button
              className={`item ${
                index === this.state.selectedIndex ? "is-selected" : ""
              }`}
              key={index}
              onClick={() => this.selectItem(index)}
            >
              {this.setIcon(item.title)}
              {item.element || item.title}
            </button>
          );
        })}
      </div>
    );
  }
}

export default CommandList;
