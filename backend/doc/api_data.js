define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "C__Users_Dawid_Layne_Desktop_poll_creator_backend_doc_main_js",
    "groupTitle": "C__Users_Dawid_Layne_Desktop_poll_creator_backend_doc_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/",
    "title": "The index page",
    "group": "index",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "render",
            "description": "<p>The index.html page</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "index",
    "name": "Get"
  },
  {
    "type": "get",
    "url": "/poll/:pollid",
    "title": "Get poll data",
    "group": "polls",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pollid",
            "description": "<p>The polls unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>The poll data in json form.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"3jA8L\",\n  \"title\": \"Should we give out free coffee?\",\n  \"options\": [\n    {\n      \"desc\": \"yes\",\n      \"votes\": 10\n    },\n    {\n      \"desc\": \"no\",\n      \"votes\": 1\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PollNotFound",
            "description": "<p>The <code>id</code> of the poll was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "error-response:",
          "content": "{\n   \"title\": \"POLL NOT FOUND!\",\n   \"options\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/polls.js",
    "groupTitle": "polls",
    "name": "GetPollPollid"
  },
  {
    "type": "post",
    "url": "/poll",
    "title": "Create a new poll",
    "group": "polls",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>The data to be made into a poll.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n   \"title\": \"Should we give out free coffee?\",\n   \"options\": [\n     {\n       \"desc\": \"yes\",\n       \"votes\": 0\n     },\n     {\n       \"desc\": \"no\",\n        \"votes\": 0  \n     }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>The poll data that was inserted into the database. Includes the ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": \"3jA8L\",\n   \"title\": \"Should we give out free coffee?\",\n   \"options\": [\n     {\n       \"desc\": \"yes\",\n       \"votes\": 0\n     },\n     {\n       \"desc\": \"no\",\n        \"votes\": 0  \n     }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/polls.js",
    "groupTitle": "polls",
    "name": "PostPoll"
  },
  {
    "type": "post",
    "url": "/poll/:pollid",
    "title": "Update existing poll",
    "group": "polls",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pollid",
            "description": "<p>The id of the poll to update.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>The data to replace the old poll with.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n   \"id\": \"3jA8L\",\n   \"title\": \"Should we give out free coffee?\",\n   \"options\": [\n     {\n       \"desc\": \"yes\",\n       \"votes\": 1\n     },\n     {\n       \"desc\": \"no\",\n        \"votes\": 0  \n     }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "dat",
            "description": "<p>The updated poll that was inserted into the database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": \"3jA8L\",\n   \"title\": \"Should we give out free coffee?\",\n   \"options\": [\n     {\n       \"desc\": \"yes\",\n       \"votes\": 1\n     },\n     {\n       \"desc\": \"no\",\n        \"votes\": 0  \n     }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidData",
            "description": "<p>The data provided was not valid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"Invalid data!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/polls.js",
    "groupTitle": "polls",
    "name": "PostPollPollid"
  }
] });
