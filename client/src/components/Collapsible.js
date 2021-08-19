import styles from "../styles/Collapsible.module.css";
import React from "react";

class Collapsible extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.togglePanel = this.togglePanel.bind(this);
  }

  //function used to toggle the content panel
  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  //render component into browser
  render() {
    return (
      <div className={styles.whole}>
        <div onClick={(e) => this.togglePanel(e)} className={styles.header}>
          <h4>{this.props.title}</h4>
          <p>{this.props.category}</p>
        </div>
        {this.state.open ? (
          <div className={styles.content}>{this.props.children}</div>
        ) : null}
      </div>
    );
  }
}

export default Collapsible;
