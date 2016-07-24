var User = React.createClass({

    render: function() {
        return (
            <div className="note"> {this.props.children} 
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
            </div>
        );
    }
});


var UsersGrid = React.createClass({

        render: function() {
             var onNoteDelete = this.props.onNoteDelete;
        return (
            <div>
                {
                  this.props.notes.map(function(note){
                        return (
                            <User
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}>
                                {note.name}
                            </User>
                        );
                    })
                }
            </div>
        );
    }   
});


var UserEditor = React.createClass({

    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleNoteAdd: function() {
        if(!this.state.text) {return};
        var newNote = {
            id: Date.now(),
            name: this.state.text
        };
        console.log(newNote);
        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    }, 

      render: function() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Enter your name here..."
                    
                    className="input"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <br />
                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        );
    }       
});


var UsersApp = React.createClass({

    getInitialState: function() {
        return {
            notes: []
        };
    },

    componentDidMount: function() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes: localNotes });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },
    
    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
    },

    render: function() {
        return (
            <div className="note-app"> 
            <h2>Users App</h2>
                <UserEditor onNoteAdd={this.handleNoteAdd} />
                <UsersGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _updateLocalStorage: function() {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }   
});

ReactDOM.render(
    <UsersApp />,
    document.getElementById('mount-point')
);