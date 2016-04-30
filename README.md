# Shaheedul's First Website Project

# Git Instructions
The term `push` means when you send your code up to the server/github that hosts/stores your code.

The term `commit` means when you want to push some code to the server. The commit requires a message. For example, lets say you added a picture in your website. You'd create a commit. You would then do a `git add .`. This will add your new code to the **commit**. Then you would give your commit a **message** such as `Added image to my homepage`

``git status`` - This allows you to check what files have been modified or added since your last push

### Instructions
##### How to push your code to the server
1. Go to the git/code directory on your computer. To do this, go to the directory, hold `shift` and right click. Select `Open Command window here`
2. Then type in `git add .`. This will add all the changes/files you have made to something called a **commit**.
3. Then type in `git commit -m "YOUR_MESSAGE"`. 
For example `git commit -m "Updated homepage"`.
4. Finally, type in `git push origin master`. This will push all your new code to the server.

---
##### Other useful stuff
`git stash` - Go to your git directory. Run this command. This will remove any **CHANGES** you have made.

`git clean -f` - This forces your directory, to remove **ALL CHANGES** AND **ALL NEW FILES IN THAT REPOSITORY**.
