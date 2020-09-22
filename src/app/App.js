import React, { Component } from 'react';

class App extends Component {

    /* Constructor */
    constructor() {
        super();
        this.state = {
            spanish: '',
            costanish: '',
            description: '',
            words: [],
            id: '',
            showSave: true,
            showEdit: false
        };

        this.addWord = this.addWord.bind(this);
        this.editWord = this.editWord.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchWords = this.fetchWords.bind(this);
    }

    /* Evento que se lanza cuando el componente está montado */
    componentDidMount() {
        this.fetchWords();
    }

    /* Obtiene el listado de palabras */
    fetchWords() {
        fetch('api/words')
        .then(res => res.json())
        .then(data => {
            this.setState({words: data});
            console.log(this.state.words);
        })
    }

    /* Añade una palabra */
    addWord(e) { 
        fetch('/api/words', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            M.toast({html: 'Palabra Guardada'});
            this.setState({spanish: '', costanish: '', description: '', _id: ''});
            this.fetchWords();
        })
        .catch(err => console.log(err));

        e.preventDefault();
    }

    /* Obtiene una palabra a partir de su ID */
    getWordById(id) {
        fetch(`/api/words/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState(
                { 
                    spanish: data.spanish, 
                    costanish: data.costanish,
                    description: data.description,
                    _id: data._id,
                    showSave: false, 
                    showEdit: true
                }
            )       
        })
    }    

    /* Actualiza una palabra a partir de su ID */
    editWord() {
        fetch(`/api/words/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);   
            M.toast({html: 'Palabra Actualizada'});
            this.setState({
                spanish: '', 
                costanish: '', 
                description: '', 
                _id: '', 
                showSave: true, 
                showEdit: false
            });
            this.fetchWords();     
        })
    }    

    

    /* Elimina una palabra a partir de su ID */
    deleteWord(id) {
        if(confirm('¿ Estás seguro que quieres eliminar ?')) {
            fetch(`/api/words/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Palabra eliminada'});
                this.setState({title: '', description: '', _id: ''});
                this.fetchWords();            
            })
            .catch(err => console.error(err));
        }
    }

    /* Identifica si hay cambios en el formulario */
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }) 
    }

    /* Renderiza el componente en el navegador */
    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">COSTA GOOGLE</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="card">
                            <div className="card-content">
                                <form>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="spanish" onChange={this.handleChange} value={this.state.spanish} type="text" placeholder="Español" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="costanish" onChange={this.handleChange} value={this.state.costanish} type="text" placeholder="Costeñol" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="description" onChange={this.handleChange} value={this.state.description} className="materialize-textarea" placeholder="Descripción">
                                            </textarea>
                                        </div>
                                    </div>
                                    {this.state.showSave ? 
                                    <button onClick={this.addWord} className="btn btn-light darken-4">
                                        Guardar
                                    </button>
                                    : null }
                                    {this.state.showEdit ? 
                                    <button onClick={this.editWord} className="btn btn-light darken-4"> 
                                        Actualizar
                                    </button>
                                    : null }
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <table>
                                <thead>
                                    <tr>
                                        <th>Español</th>
                                        <th>Costeñol</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.words.map(word => {
                                            return (
                                                <tr key={word._id}>
                                                    <td>{word.spanish}</td>
                                                    <td>{word.costanish}</td>
                                                    <td>{word.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.getWordById(word._id)} style={{margin: '5px'}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteWord(word._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;