const ePagesList = document.getElementById("pages-list")
const pages = {
    w3schools: {
        name: "w3schools",
        link: "pages/teste",
    }
}

for (let page of pages){
    let wrapper = document.createElement("div")
    let pageLink = document.createElement("a")
    pageLink.innerText = page.name
    pageLink.href = page.link
    wrapper.appendChild(wrapper)
    ePagesList.appendChild(wrapper)
}