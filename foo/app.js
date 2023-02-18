const express = require("express");

// Create the Express app
const app = express();

const logTime = (req, res, next) => {
	console.log("Current time: ", new Date().toISOString());
	// Since no response has been returned yet, invoke the `next` function to
	// move on to the next middleware function.
	next();
};

const passOnMessage = (req, res, next) => {
	console.log("Passing on a message!");
	req.passedMessage = "Hello from passOnMessage!";
	next();
};
// Assign routes


// const foo = [passOnMessage, logTime]


app.get("/", (req, res, next) => {
	// Send a respose back to the client
	res.send("Hello World!");
	if (req.params.message) {
		res.send(`Echo: ${req.params.message}`);
	} else {
		console.log("HERE!!!");
		next();
	}
	// console.log("Passed message: ", req.passedMessage);
	// res.send("Hello World!");
});

app.get("/bye", (req, res) => {
	res.send("FOO Goodbye!");
});

app.get("/throw-error", (req, res) => {
	throw new Error("bar");
});

// app.get('/json', (req, res) => {
//     const resp = {
//         property1: "value1",
//         property2: "value2"
//     };
//     res.json(resp);
// })

app.post("/users/:firstName/:lastName", (req, res) => {
	// Do something...
	// Send a response back to the client

	console.log(req.params.firstName); // John
	console.log(req.params.lastName); // Adams
});


// Error handler to log errors
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      // TODO Log the error to the database
    } else {
      console.error("FOOBAR");
    }
    next(err);
  });


// Use middleware on application level
// Must have four four parameters; otherwise, Express will not treat it as an error handler
// This should be after all other calls to `app.use()` and all of your app route definitions
app.use((err, req, res, next) => {
	console.error(err.message);
	res.status(err.status || 500);
	res.send(
		"An error occurred! Please check the url, or wait a few minutes and try again."
	);
});

// Tell the server to listen for incoming traffic on a specific port
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
