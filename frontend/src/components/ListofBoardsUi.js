import React, { Component } from 'react';

class ListofBoardsUi extends Component
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            boards: [],
            boardName: ''
        }
    }

    async componentDidMount()
    {
        var user = JSON.parse(localStorage.getItem('user_data'));
        // var js = '{"email":"'+ user.id + '"}';
        // console.log(js);
        var url = 'http://localhost:5000/api/User/' + user.id;

        try
        {
            const response = await fetch(url,{method:'GET',headers:{'Content-Type': 'application/json'}});

            console.log("calling get boards api");

            var res = JSON.parse(await response.text());

            console.log(res);

            this.setState
            (
                {
                    boards: res.result
                }
            )

            console.log(this.state.boards);
        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }
    }

    handleSubmit = async event =>
    {
        event.preventDefault();
        console.log("submmiting create board");

        var user = JSON.parse(localStorage.getItem('user_data'));
        var js = '{"boardName":"'+ this.state.boardName + '","index":' + this.state.boards.length + ',"parentUsers":[' + '"' + user.id + '"' +']}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/CreateBoard',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Create Board api");

            var res = JSON.parse(await response.text());

            console.log(res);

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }

        this.setState({boardName: ''});

        this.componentDidMount();
    }

    handleBoardNameChange = event =>
    {
        this.setState({boardName: event.target.value});
    }

    render()
    {
        return(
            <div>  
                <h1>WELCOME This is the list of boards page</h1>
                {
                    this.state.boards.map(board => <div id={board._id} key={board._id}> {board.boardName}</div>)
                }
                <form>
                    <label>Create Board</label>
                    <input type="text" id="boardName" placeholder="Name of new Board" value={this.state.boardName} onChange={this.handleBoardNameChange}/><br/>
                    <input type="submit" value="Create" onClick={this.handleSubmit}/><br/>
                </form>
            </div>
        );
    }
};

export default ListofBoardsUi;
