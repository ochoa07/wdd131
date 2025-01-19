document.addEventListener("DOMContentLoaded", function() 
{
    const themeSelect = document.getElementById("theme");
    const logo = document.querySelector(".logo");

    function changeTheme() {
        if (themeSelect.value === "dark") {
            document.body.classList.add("dark");

            logo.src = "byui-logo_white.png";
        } else {
            document.body.classList.remove("dark");

            logo.src = "byui-logo_blue.webp";
        }
    }

    themeSelect.addEventListener("change", changeTheme);

    changeTheme();
});