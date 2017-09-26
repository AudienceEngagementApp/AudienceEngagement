# Contributing

## Basics

### Technologies/Frameworks/Standards

To better aid in the development process of this app it helps if you know something about the following products:

* git (How to pull, branch, commit, push, and PRs)
* docker / docker-compose (how to 'up' a cluster)
* Javscript / Webapp tools:
  * Babel
  * React
  * Redux
  * React Router
  * Flow
  * Sass / CSS
  * npm (and how to use packages found online)
* Firebase

### Random Guidelines

Here is some general and random advice that is helpful for when you're beginning.
* It doesn't matter what editor you use, but it should support '.editorconfig' (which is a file) integration. this is
often done via plugin. That way everyone that contributes to this project uniformly uses styling conventions where
appropriate (like when to use tabs vs spaces).
* Except in JSON, use single quotes ( ' and not " ) in javascript.
* Flow only works if you add the comment "// @flow" to the top of every file. Do it.
* Leave semicolons off wherever possible.
* Sort your imports (F5 on most editors) at the top of every page.
* Use babel paradigms rather than normal paradigms ('import' rather than 'require', fat-arrow functions, etc.)

## Pull Request Process

* Don't commit to master (normally)
* Checkout a new branch whenever you edit code and then push/PR that to master instead.
* Don't merge your own PRs. Get approval from groupmates.
