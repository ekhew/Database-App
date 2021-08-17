import styles from "../styles/Filter.module.css";
import React from "react";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className={styles.whole}>
        <div onClick={(e) => this.togglePanel(e)} className={styles.header}>
          <p>{this.props.title}</p>
        </div>
        {this.state.open ? (
          <div className={styles.content}>
            <div className={styles.option}>
              <input type="checkbox" />
              <label>Meat</label>
            </div>
            <div className={styles.option}>
              <input type="checkbox" />
              <label>Vegetable</label>
            </div>
            <div className={styles.option}>
              <input type="checkbox" />
              <label>Soup</label>
            </div>
            <div className={styles.option}>
              <input type="checkbox" />
              <label>Other</label>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Filter;
