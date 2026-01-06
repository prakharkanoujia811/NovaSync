-> Project overview: NovaSync is an expense splitting web application which can be used to create groups, add expenses and get minimal settlement transaction plan.

-> Problem Statement: Build a web application where an individual user can create expense groups, invite or add members, log expenses with metadata (payer, participants, description, tags), choose splitting rules (equal, exact amounts, or percent), view a group ledger, and obtain a minimal-set settlement plan that tells who should pay whom. The product should include a simple group chat or comment mechanism for contextual discussion.

-> Setup and Installment: cd novasync-frontend, then npm run dev and cd novasync-backend, then npm run dev.

-> Usage Guide: 
   - Create an account.
   - Add groups in group page by adding the group name and its members' names.
   - Add multiple expenses after selecting a created group in expense page by adding expense description, amount, split type and the contributions of the member according to the split type.
   - Click on Settle button and get the minimal settlement plan.

-> Features:
   - Users can view profile and no. of groups created on dashboard page.
   - Users can create groups.
   - Users can add expenses for various groups.
   - Users can view optimal settlement transaction plan.

-> Minimal-Settlement Logic: I have created an  array containing the members and their respective balances which are positive (to be received) and negative (to be paid), then inside a loop which runs till the balance of all members is 0, I sort the array in ascending order, store the amount at 0th index as debtor, and the amount at last index as creditor, store the minimum of the absolute value of the two in settledAmount, push a statement using these variables in an array,then update the creditor and debtor accordingly, then I remove the member from the array having 0 balance using filter. After the loop ends we have the minimum settlement plan.

->Technology Stack:
   - Reactjs (frontend)
   - Express/Node.js (backend)
   - MongoDB (database)

-> Credits and Attributions:
Help From Mentors -

Recieved guidance from my mentors Rahul joshi Sir and Samriddhi Singh Ma'am.

Youtube videos referred to :

https://www.youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW (Backend tutorials of chai aur code).

https://www.youtube.com/playlist?list=PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH (Backend tutorials of sheriyans coding school).

Use of AI tools -

Use of AI tools for learning, especially in areas like :

-Used AI tools while working on minimal settlements part.

-UI Enhancement and CSS (for some components like button hover effect and placeholder rising effect)

-Usage and applications of Context APIs, useNavigate()

-json web tokens for authentication.

-Use of AI tools for debugging.

Frontend Libraries Used -

https://lucide.dev/ Lucide React for icons