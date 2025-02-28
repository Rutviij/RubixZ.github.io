
    <script>
        let timerInterval, startTime, running = false;
        let times = JSON.parse(localStorage.getItem("times")) || [];
        let chartInstance = null;


        function toggleTimer() {
            if (running) {
                clearInterval(timerInterval);
                running = false;
            } else {
                startTime = Date.now();
                running = true;
                timerInterval = setInterval(() => {
                    let elapsed = Date.now() - startTime;
                    let minutes = Math.floor(elapsed / 60000).toString().padStart(2, '0');
                    let seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
                    let milliseconds = (elapsed % 1000).toString().padStart(3, '0');
                    document.getElementById("timer").innerText = `${minutes}:${seconds}:${milliseconds}`;
                }, 10);
            }
        }


        function saveSolveTime() {
            let timeText = document.getElementById("timer").innerText;
            let totalMilliseconds = parseInt(timeText.split(":")[0]) * 60000 +
                                    parseInt(timeText.split(":")[1]) * 1000 +
                                    parseInt(timeText.split(":")[2]);


            times.push(totalMilliseconds);
            localStorage.setItem("times", JSON.stringify(times));
            generateChart();
            updateBestTimes();
            alert("Time saved!");
        }


        function updateBestTimes() {
            let sorted = [...times].sort((a, b) => a - b);
            document.getElementById("best5").innerText = sorted.slice(0, 5).map(ms => formatTime(ms)).join(", ") || "-";
            document.getElementById("best10").innerText = sorted.slice(0, 10).map(ms => formatTime(ms)).join(", ") || "-";
            document.getElementById("best25").innerText = sorted.slice(0, 25).map(ms => formatTime(ms)).join(", ") || "-";
        }


        function formatTime(ms) {
            let minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
            let seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
            let milliseconds = (ms % 1000).toString().padStart(3, '0');
            return `${minutes}:${seconds}:${milliseconds}`;
        }


        function generateChart() {
            let ctx = document.getElementById("timeChart").getContext("2d");
            if (chartInstance) chartInstance.destroy();
            chartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: times.map((_, i) => `Attempt ${i + 1}`),
                    datasets: [{
                        label: "Solve Times",
                        data: times,
                        borderColor: "#00ffcc",
                        backgroundColor: "rgba(0, 255, 204, 0.2)",
                        borderWidth: 2
                    }]
                },
                options: { responsive: true, scales: { y: { beginAtZero: true } } }
            });
        }


        document.getElementById("themeToggle").addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });


        document.getElementById("deleteAllData").addEventListener("click", () => {
            let password = prompt("Enter password to delete all data:");
            if (password === "1234") {
                localStorage.clear();
                alert("All data deleted!");
                location.reload();
            } else {
                alert("Wrong password!");
            }
        });


        function showTab(tab) {
            document.querySelectorAll('.container').forEach(c => c.style.display = 'none');
            document.getElementById(tab).style.display = 'block';
        }


         function createTechSymbols() {
            for (let i = 0; i < 100; i++) {
                let symbol = document.createElement("div");
                symbol.innerText = "⚡";
                symbol.className = "tech-symbol";
                document.querySelector(".tech-background").appendChild(symbol);
            }
        }
        

 function createTechSymbols() {
            let container = document.querySelector(".tech-background");
            for (let i = 0; i < 50; i++) {
                let symbol = document.createElement("div");
                symbol.innerText = "▫️ ▪️";
                symbol.className = "tech-symbol";
                let size = Math.random() * 20 + 10;
                symbol.style.fontSize = `${size}px`;
                symbol.style.left = `${Math.random() * 100}vw`;
                symbol.style.animationDuration = `${Math.random() * 5 + 3}s`;
                symbol.style.animationDelay = `-${Math.random() * 5}s`;
                container.appendChild(symbol);
            }
        }


        createTechSymbols();
        generateChart();
        updateBestTimes();
    </script>
