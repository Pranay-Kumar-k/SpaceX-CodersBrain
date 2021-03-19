window.onload = () => {
    var years = document.getElementById("launch-years")
    for(var i=2006; i<=2020; i++) {
        var button = document.createElement('button');
        button.textContent = i
        button.setAttribute("class","button")
        var fragment = document.createDocumentFragment();
        fragment.append(button)
        years.appendChild(fragment)
    }
}