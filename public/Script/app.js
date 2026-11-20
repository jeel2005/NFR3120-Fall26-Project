// CODE REFERENCES:
// - IIFE wrapper, Start() and window.addEventListener("load", Start): WebProject template (public/Script/app.js)
// - getElementById / querySelectorAll: Chapter 9 slides
// - addEventListener (input and submit): Chapter 9 slides
// - event.preventDefault(): Chapter 9 slides
// - checking if a field is empty: Chapter 9 slides
// - dataset (data-price on quantity boxes): Chapter 9 slides
// - createElement / appendChild: Chapter 9 and Demo/DOM.html
// - forEach(): Chapter 10
// - arrow functions (=>): Demo/fat-arrow.js
// - order total and error messages: Created for this project
//
// IIFE stands for Immediately Invoked Function Expression.
(function()
{
    // Add up the price x quantity of every row on the order form
    function UpdateTotal()
    {
        let total = 0;
        document.querySelectorAll(".qty").forEach(box =>
        {
            let qty = parseInt(box.value);
            if (!isNaN(qty) && qty > 0)
            {
                total += qty * parseFloat(box.dataset.price);
            }
        });
        document.getElementById("total").textContent = total.toFixed(2);
    }

    // Check the form before it is sent (the server checks again)
    function ValidateOrder(event)
    {
        let messages = [];
        let name = document.getElementById("customer").value.trim();
        let hasItems = false;

        document.querySelectorAll(".qty").forEach(box =>
        {
            if (parseInt(box.value) > 0)
            {
                hasItems = true;
            }
        });

        if (name == "")
        {
            messages.push("Please enter your name.");
        }
        if (!hasItems)
        {
            messages.push("Please choose at least one item.");
        }

        let errorBox = document.getElementById("formErrors");
        errorBox.innerHTML = "";

        if (messages.length > 0)
        {
            event.preventDefault();
            messages.forEach(message =>
            {
                let p = document.createElement("p");
                p.className = "error";
                p.textContent = message;
                errorBox.appendChild(p);
            });
        }
    }

    function Start(){
        console.log("App started....")

        // These only exist on the New Order page
        let orderForm = document.getElementById("orderForm");
        if (orderForm)
        {
            orderForm.addEventListener("input", UpdateTotal);
            orderForm.addEventListener("submit", ValidateOrder);
            UpdateTotal();
        }
    }
    window.addEventListener("load",Start);
})();
