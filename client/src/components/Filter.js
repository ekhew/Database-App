import styles from "../styles/Filter.module.css";
import React from "react";
import Axios from "axios";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.togglePanel = this.togglePanel.bind(this);

    this.state = {
      filteredList: [],
    };
    this.setFilteredList = this.setFilteredList.bind(this);
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  setFilteredList(e) {
    this.setState({
      filteredList: [...this.state.filteredList, e.target.value],
    });
    console.log(this.state.filteredList);
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
              <input
                type="checkbox"
                value="Meat"
                onChange={(e) => this.setFilteredList(e)}
              />
              <label>Meat</label>
            </div>
            <div className={styles.option}>
              <input type="checkbox" value="Vegetable" />
              <label>Vegetable</label>
            </div>
            <div className={styles.option}>
              <input type="checkbox" value="Soup" />
              <label>Soup</label>
            </div>
            <div className={styles.option}>
              <input type="checkbox" value="Other" />
              <label>Other</label>
            </div>
            <div className={styles.doneBtn}>
              <button
                onClick={(e) => {
                  //this.props.setFilteredCategories(this.state.filteredList);
                  this.props.getFilteredDishes();
                  this.togglePanel(e);
                }}
              >
                Done
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Filter;
