AOS.init();

const toggleBtn =
    document.getElementById("themeToggle");

const html =
    document.documentElement;

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme) {

    html.setAttribute(
        "data-bs-theme",
        savedTheme
    );

}

toggleBtn.addEventListener(
    "click",
    () => {

        const currentTheme =
            html.getAttribute("data-bs-theme");

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        html.setAttribute(
            "data-bs-theme",
            newTheme
        );

        localStorage.setItem(
            "theme",
            newTheme
        );

        const icon =
            toggleBtn.querySelector("i");

        icon.classList.toggle("fa-moon");

        icon.classList.toggle("fa-sun");

    }
);

const contactForm =
    document.getElementById("contact-form");

contactForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        emailjs.send(
            "service_mxdgmiu",
            "template_jicbzu5",
            {
                name:
                    document.getElementById("name").value,

                email:
                    document.getElementById("email").value,

                message:
                    document.getElementById("message").value
            },
            {
                publicKey:
                    "pj8wIiBzPo2npZ1gu"
            }
        )

            .then(() => {

                alert(
                    "Message Sent Successfully!"
                );

                contactForm.reset();

            })

            .catch((error) => {

                console.log(error);

                alert(
                    "Failed To Send Message"
                );

            });
    }
);