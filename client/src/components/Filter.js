import styles from "../styles/Filter.module.css";
import React from "react";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      filteredList: [],
    };
    this.togglePanel = this.togglePanel.bind(this);
    this.setFilteredList = this.setFilteredList.bind(this);
  }

  //toggles the dropdown menu
  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  //sets the 'filteredList' array state based on what checkboxes are checked in the menu
  setFilteredList(e) {
    const isChecked = e.target.checked; //true if the checkbox is checked, and false otherwise

    if (isChecked) {
      this.setState({
        filteredList: [...this.state.filteredList, e.target.value],
      });
    } else {
      const index = this.state.filteredList.indexOf(e.target.value);
      this.state.filteredList.splice(index, 1);
      this.setState({ filteredList: this.state.filteredList });
    }
  }

  //prints the current array in the 'filteredList' state
  printArr() {
    console.log(this.state.filteredList);
  }

  //clears the array in the 'filteredList' state
  clearArr() {
    this.setState({ filteredList: [] });
  }

  //render component into browser
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
              <input
                type="checkbox"
                value="Vegetable"
                onChange={(e) => this.setFilteredList(e)}
              />
              <label>Vegetable</label>
            </div>
            <div className={styles.option}>
              <input
                type="checkbox"
                value="Soup"
                onChange={(e) => this.setFilteredList(e)}
              />
              <label>Soup</label>
            </div>
            <div className={styles.option}>
              <input
                type="checkbox"
                value="Other"
                onChange={(e) => this.setFilteredList(e)}
              />
              <label>Other</label>
            </div>
            <div className={styles.doneBtn}>
              <button
                onClick={(e) => {
                  this.props.setFilteredCategories(this.state.filteredList);
                  //this.printArr();
                  this.clearArr();
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
