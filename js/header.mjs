function basePath() {
    const href = window.location.href;
    if (href.indexOf('/account') > 0) {
        return href.substring(0, href.indexOf('/account')) + "/";
    } else if (href.indexOf('/post') > 0) {
        return href.substring(0, href.indexOf('/post')) + "/";
    } else {
        return href.substring(0, href.lastIndexOf('/')) + "/";
    }
}

const appHeader = `
    <div class="header_logo flex">
        <a href="${basePath()}index.html"><img class="logo" src="${basePath()}assets/6502423.jpg" alt="Logo"/></a>
        <p class="text_header">HotView Labs</p>
    </div>
    <div id="button_container">
        <div id="signindiv" class="hidden">
            <a href="${basePath()}account/register.html"><button id="register">Register</button></a>
            <a href="${basePath()}account/login.html"><button id="login">LogIn</button></a>
        </div>
        <div id="creatediv" class="hidden">
            <a href="${basePath()}post/create.html"><button class="header_button" id="create">Create a new post</button></a>
            <a id="logout" href="#"><button class="header_button" id="logout">Log out</button></a>
        </div>
    </div>
`;
document.getElementById("app-header").innerHTML = appHeader;
