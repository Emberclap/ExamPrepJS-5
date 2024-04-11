For the solution of some of the following tasks, you will need to use an up-to-date version of the local REST service provided in the lesson’s resources archive. You can read the documentation here. 

Environment Specifics
Please be aware that every JS environment may behave differently when executing code. Certain things that work in the browser are not supported in Node.js, which is the environment used by Judge.

The following actions are NOT supported:

⦁	.forEach() with NodeList (returned by querySelector() and querySelectorAll())

⦁	.forEach() with HTMLCollection (returned by getElementsByClassName() and element.children)

⦁	using the spread-operator (...) to convert a NodeList into an array

⦁	append() (use only appendChild())

⦁	prepend()

⦁	replaceWith()

⦁	replaceAll()

⦁	closest()

⦁	replaceChildren()

If you want to perform these operations, you may use Array.from() to first convert the collection into an array. 
