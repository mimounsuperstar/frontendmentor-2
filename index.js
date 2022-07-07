const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
const d = new Date();
let today = d.getDay();
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        max = Math.max(...data.map(day => day["amount"]))
        let spendings = 0
        
        data.map(day => {
            let graphHeight = (day["amount"] * 90) / max
            graphHeight = graphHeight.toString()+"px"
            const graphContainer = document.createElement("div");
            graphContainer.classList.add("graph")
            graphContainer.setAttribute("amount", "$"+day["amount"].toString())

            const graphBar = document.createElement('div')
            graphBar.classList.add("graph-bar")
            graphBar.style.height = graphHeight
            if (days[today] == day["day"]){
                graphBar.classList.add("active")
            } 
            graphContainer.appendChild(graphBar)

            const graphDay = document.createElement("div")
            graphDay.classList.add("graph-day")
            graphDay.innerText = day["day"]
            graphContainer.appendChild(graphDay)

            document.querySelector(".graph-container").appendChild(graphContainer)

            spendings += day["amount"]
        })
        spendings = "$"+spendings.toString()
        document.querySelector(".spendings").innerText = spendings
    })
