const express = require("express");
const bodyParser = require("body-parser");
const Date = require(__dirname + "/date.js");

const port = process.env.PORT || 3000;

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    const day = Date();
    // const currentDay = today.getDay();
    // const day = "";

    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday";
    //         break;

    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         break;
    // }
    res.render("list", { listTitle: day, newListItems: items });
    // console.log(items);
});

// app.post("/", (req, res) => {
//     const item = req.body.newItem;
//     items.push(item);
//     res.redirect("/");
// });

app.post("/", (req, res) => {
    const item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});
app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});
app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});