document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".task-checkbox");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", async function () {
            const taskId = this.dataset.taskId;
            const isCompleted = this.checked;

            // update request to the server
            await fetch(`/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: isCompleted ? "completed" : "pending" }),
            });

            // cross out task
            const taskText = this.nextElementSibling;
            if (isCompleted) {
                taskText.classList.add("crossed-out");
            } else {
                taskText.classList.remove("crossed-out");
            }
        });
    });
});
