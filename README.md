# Setup
```js
var replitapi = require("replit-unofficial-api");
```

# Current functions
### userdata(username)
Returns the user id, name, and their 10 latest repls.

### repldata(username, replname)
Returns information about the repl of a specific user.

### replappsdata(tag,all)
Returns information and repls in an 'app' with a specific tag.
Setting "all" to true will return all repls (reccomended with tags with less than 300 repls), while having it set to false will return 10

### featuredrepls()
Returns the 10 most latest featured repls

# Contributing
Add a pull request if you would like to contribute a new function.
For majour changes, open an issue first explaining what you would like to add.
