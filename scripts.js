(function() {

    var form = document.querySelector("#myForm"),
        fields = form.querySelectorAll("[data-error]");

    function isNotEmpty(field)
    {
        return field.value !== "";
    }

    function isAtLeast(field, min)
    {
        return field.value.length >= min;
    }

    function isEmail(field)
    {
        return field.value.indexOf("@") !== -1;
    }

    function displayErrors(errors)
    {
        var ul = document.querySelector("ul.errors");

        if(!ul)
        {
            ul = document.createElement("ul");

            ul.classList.add("errors");
        }

        ul.innerHTML = "";

        errors.forEach(function(error)
        {
            var li = document.createElement("li");
            li.textContent = error;

            ul.appendChild(li);
        });

        form.parentNode.insertBefore(ul, form);
    }


    form.addEventListener("submit", function(e) {


        e.preventDefault();

        var errors = [];


        for(var i = 0; i < fields.length; i++)
        {
            var field = fields[i];
                isValidate = false;

            if(field.type === "text")
            {
                isValidate = isNotEmpty(field);
            }
            else if(field.type === "email")
            {
                isValidate = isEmail(field);
            }
            else if(field.type === "select-one")
            {
                isValidate = isNotEmpty(field);
            }
            else if(field.type === "textarea")
            {
                isValidate = isAtLeast(field, 15);
            }

            if(!isValidate)
            {
                field.classList.add("error");
                errors.push(field.dataset.error);
            }
            else
            {
                field.classList.remove("error");
            }
        }

        if(errors.length) {
            displayErrors(errors);
        }
        else
        {
            form.submit();
        }

        console.log(errors);

    }, false)
})();

