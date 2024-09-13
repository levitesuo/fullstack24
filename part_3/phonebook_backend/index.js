const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("reqContent", (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(
  morgan("tiny", {
    skip: (req) => req.method === "POST",
  }),
);

app.use(
  morgan(
    ":method :url :req[Content-Length] :status - :total-time ms :reqContent",
    {
      skip: (req) => req.method !== "POST",
    },
  ),
);

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "The name is missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "The phonenumber is missing.",
    });
  } else if (persons.find((item) => item.name === body.name)) {
    return response.status(400).json({
      error: "The person is alredy in the phonebook",
    });
  }
  const person = {
    id: Math.random().toString(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});

app.get("/info", (request, response) => {
  let first_line = `<p>Phonebook has info for ${persons.length} people.</p>`;
  let second_line = `${Date(Date.now()).toString()}`;
  response.send(first_line + second_line);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
