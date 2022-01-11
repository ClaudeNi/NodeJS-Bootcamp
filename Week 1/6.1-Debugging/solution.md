### problem 1

The problem we had is that we were using an array method on an object.  
The code didnt include the part that chooses meats category so we got an error that we are on an object and not the array inside the object.

The fix is simple, add .meats to line 69 right before the .foreach.

### problem 2

The second problem we had was that we werent counting the meats because the line of code was commented out.

The fix is simple, just uncomment the line and it now works.

### other

There were also extra console.log that weren't required so they were also removed as to not spam the terminal with unnecessary information.
