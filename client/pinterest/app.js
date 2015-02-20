var Tile = React.createClass({

    getInitialState: function() {
        var width = Math.round(Math.random() * 100 + 100);
        var height = Math.round(Math.random() * 100 + 100);
        return {showScreenshot: false, extra: {width: width, height: height}};
    },

    _onMouseEnter: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({showScreenshot: true});
    },

    _onMouseLeave: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({showScreenshot: false});
    },

    render: function() {
        var ss = null;
        if (this.state.showScreenshot) {
            ss = (
                <div className="ss-container">
                    <div>test</div>
                </div>
            );
        }
        return (
            <div className="tile" onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
                <img ref="logo" className="logo" src={"http://placehold.it/"+this.state.extra.width+"x"+this.state.extra.height} />
                {ss}
            </div>
        );
    }
});

var MainView = React.createClass({

    getInitialState: function() {
        var tiles = [];

        // TODO oikea data
        for (var i = 0; i < 759; i++) {
            tiles.push({
                height: Math.random() * 100 + 200
            });
        }

        return {
            windowWidth: window.innerWidth,
            tiles: tiles
        };
    },

    handleResize: function(e) {
        this.setState({windowWidth: window.innerWidth});
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },

    render: function() {
        var columnN = Math.floor(this.state.windowWidth / this.props.minColumnWidth);
        var currentN = 0;
        var maxN = this.state.tiles.length;
        var leftN = maxN;
        var perColumn = Math.ceil(maxN / columnN);

        var columns = [];
        for (var i = 0; i < columnN; i++) {
            var todoNow = Math.min(leftN, perColumn);
            var tiles = [];
            for (var j = currentN; j < currentN + todoNow; j++) {
                var tile = this.state.tiles[j];
                tiles.push(<Tile key={"tile"+j} data={tile}/>);
            }
            currentN += todoNow;
            leftN -= todoNow;
            columns.push(
                <div key={i+"/"+columnN} className="column">
                    {tiles}
                </div>
            );
        }

        return (
            <div className="main-view">
                {columns}
            </div>
        );
    }
});

React.render(
    <MainView minColumnWidth={300}/>,
    document.body
);