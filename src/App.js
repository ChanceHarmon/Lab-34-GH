import React from 'react';
import { connect } from 'react-redux';
const uuid = require('uuid/v4');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      id: '',
      timeStamp: '',
    };
    this.state.temp = '';
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const catId = uuid();
    const timeStamp = Math.floor(Date.now() / 1000);
    this.props.createNewCategory({ name: this.state.category, id: catId, timeStamp: timeStamp });
  };

  handleUpdate = (event, id) => {
    event.preventDefault();
    this.props.updateCategory({ name: this.state.temp, id: id });
  }

  handleDelete = (event, id) => {
    event.preventDefault();
    this.props.deleteCategory({ id: id });
  }

  render() {
    return (
      <>
        {
          this.props.categories.map((category, i) =>
            <React.Fragment key={i}>
              <li>{category.name}</li>
              <form onSubmit={(event) => this.handleUpdate(event, category.id)}>
                <input
                  name='temp'
                  type='text'
                  onChange={this.handleChange}
                  placeholder='Update Category'
                />
                <button type='submit'>Update</button>
                <button type='submit' onClick={(event) => this.handleDelete(event, category.id)}>Delete Category</button>
              </form>
            </React.Fragment>
          )
        }
        <form onSubmit={this.handleSubmit}>
          <input
            name='category'
            type='text'
            value={this.state.category}
            onChange={this.handleChange}
            placeholder='New Category'
          />
          <button type='submit'>Create New Category</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCategory: (categoryName) => {
      dispatch({
        type: 'CATEGORY_CREATE',
        payload: categoryName,
      });
    },
    updateCategory: (updatedInfo) => {
      dispatch({
        type: 'CATEGORY_UPDATE',
        payload: updatedInfo,
      });
    },
    deleteCategory: (catId) => {
      dispatch({
        type: 'CATEGORY_DELETE',
        payload: catId,
      });
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
