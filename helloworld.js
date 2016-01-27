var Header = React.createClass({
    render: function() {
        return  <div class="header-innner">
            <h1>Hello, World!</h1>
            <p>This is React.js sample page</p>
        </div>;
    }
});
var Footer = React.createClass({
    render: function() {
        return  <div class="footer-innner">
            <hr/>
            <h1>React.js Sample Web Page</h1>
            <p>copyright 2015 <br/>john doe</p>
        </div>;
    }
});
var Main= React.createClass({
    render: function() {
        return  <ul class="main-innner">
            <li id="content-1"></li>
        </ul>;
    }
});
var Section= React.createClass({
    render: function() {
        return  <article class="section-innner">
            <h1>Sections title</h1>
            <p>Here is Content area</p>
        </article>;
    }
});
  
React.render(<Header />, document.getElementById('header'));
React.render(<Main />, document.getElementById('main'));
React.render(<Section />, document.getElementById('content-1'));
React.render(<Footer />, document.getElementById('footer'));