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

            // console.log("calling get boards api");

            var res = JSON.parse(await response.text());

            // console.log(res);

            this.setState
            (
                {
                    boards: res.result
                }
            )
            
            this.handleUpdate = this.handleUpdate.bind(this);

            // console.log(this.state.boards);
        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }
    }

    handleCreate = async event =>
    {
        event.preventDefault();
        console.log("submmiting create board");

        var user = JSON.parse(localStorage.getItem('user_data'));
        var js = '{"boardName":"'+ this.state.boardName + '","index":' + this.state.boards.length + ',"parentUsers":["' + user.id + '"]}';

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

    handleDelete = async (event, id) =>
    {
        console.log(id);
        event.preventDefault();
        console.log("submmiting delete board");

        var js = '{"_id":"'+ id + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/DeleteBoard',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            console.log(res);

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }

        this.componentDidMount();
    }

    handleUpdate = async (event, id) =>
    {
        var temp;
        if (event.target.innerHTML === "Edit")
        {
            event.target.innerHTML = "Update";

            temp = document.createElement('input');
            console.log(event.target.previousSibling.previousSibling.innerHTML);
            temp.value = event.target.previousSibling.previousSibling.innerHTML;
            event.target.parentNode.replaceChild(temp,event.target.previousSibling.previousSibling);
        }
        else
        {
            event.target.innerHTML = "Edit";

            temp = document.createElement('span');
            temp.innerHTML = event.target.previousSibling.previousSibling.value;
            temp.onclick = this.handleGotoPage;
            event.target.parentNode.replaceChild(temp,event.target.previousSibling.previousSibling);


            var js = '{"_id":"'+ id + '","boardName":"' + temp.innerHTML + '"}';

            console.log(js);

            try
            {
                const response = await fetch('http://localhost:5000/api/UpdateBoard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

                var res = JSON.parse(await response.text());

                console.log(res);

            }
            catch(e)
            {
                console.log("there was an error");
                console.log(e.toString());
                return;
            }

            this.componentDidMount();
        }
    }

    handleGotoPage = (event, boardId) =>
    {
        console.log(boardId);
        window.location.href = '/BoardPage/' + boardId;
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
                    this.state.boards.map(board =>
                        <div key={board._id}>
                            <span onClick={(e) => this.handleGotoPage(e, board._id)}>{board.boardName}</span>
                            <button onClick = {(e) => this.handleDelete(e,board._id)}>Delete</button>
                            <button onClick = {(e) => this.handleUpdate(e,board._id)}>Edit</button>
                        </div>)
                }
                <form>
                    <label>Create Board</label>
                    <input type="text" id="boardName" placeholder="Name of new Board" value={this.state.boardName} onChange={this.handleBoardNameChange}/><br/>
                    <input type="submit" value="Create" onClick={this.handleCreate}/><br/>
                </form>
            </div>
        );
    }
};

export default ListofBoardsUi;
