## Stripe Integration Setup in Frontend:
- Installed the @stripe/stripe-react-native package in our frontend project.
- Created the StripeConfig.js file to initialize Stripe in our React Native app with our publishable key.
- Set up the Stripe provider to wrap our app, enabling Stripe functionality across our app.

## Summary of Next Steps:
- Frontend: We’ve already added StripeProvider. Next, we have to add UI components for Stripe like CardForm or CardField.
- Backend: Prepare our backend to handle payment intents and webhooks (once our backend is ready).
- Testing: Test the entire flow using Stripe’s test mode with the provided test cards.
- Once everything is integrated, we can test end-to-end payments with real-world scenarios.

## Dependencies for Frontend
For the frontend setup (React Native app), the following dependencies are required:

- Node.js: Version 14.x or higher.
- npm (Node Package Manager) 

Install the frontend dependencies:
```
npm install
```
This will install all necessary dependencies listed in frontend/package.json.

## Psuedocode for Frontend Components:
📌 Pseudocode: Button Implementation

This section outlines the pseudocode for implementing buttons such as Next, Get Started, Continue, etc. in a React Native application.

📝 Pseudocode
```
<Button
  onPress={onPressLearnMore}  (Handler called when user taps button)
  title="Learn More"  (Text displayed inside button)
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```
📌 Notes:

- The onPress function handles user interactions.
- The title property sets the button's text.
- The color property customizes the button appearance.
- The accessibilityLabel enhances screen reader support.

This ensures buttons are user-friendly, accessible, and function as expected within the app. 🚀

📌 Pseudocode: Text Input

This section outlines the pseudocode for implementing a text input field.

📝 Pseudocode
```
// Create a View container to hold UI components
        CREATE View container
            // Display a label text for the input field
            DISPLAY Text "Enter Text:"
            // Create a TextInput field for user input
            CREATE TextInput
                SET placeholder text to "Type here..." // Show hint text before user types
                SET value to inputText // Bind the input field to the state variable
                ONCHANGE update inputText state with user input // Update state on user input
                SET styling for input box // Apply styling for appearance
// Display the text entered by the user
            DISPLAY Text "You entered: " + inputText
```
📌 Notes:

- The TextInput field captures user input dynamically.
- The onChangeText fuction updates the state variable.
- The value property ensures the input field is controlled.
- Styling can be customized to match UI requirements.

This ensures that user input is handled efficiently and displayed correctly within the app. 🎯

📌 Pseudocode: Category Selection Screen

This section outlines the pseudocode for implementing a category selection screen in a React Native application.

📝 Pseudocode:
```
Category Screen
FUNCTION renderSelectCategoryScreen():
    DISPLAY "Select a Category" title
    DEFINE categories = ["Education", "Healthcare", "Environment", "Non-Profit", "Others"]
    DISPLAY "Choose one or more categories"
    FOR EACH category IN categories:
        CREATE checkbox OR button for category selection
    
    CREATE "Continue" button (purple)
    
    IF "Continue" button is pressed:
        IF at least one category is selected:
            NAVIGATE to next screen
        ELSE:
            DISPLAY "Please select at least one category" message
```
📌 Notes:
- Users can select one or more categories.
- The selection updates dynamically.
- The "Continue" button navigates if at least one category is chosen.
- A message is displayed if no category is selected.

This ensures an intuitive user experience for category selection. ✅

📌 Pseudocode: Campaign Selection Screen

This section outlines the pseudocode for implementing a campaign code screen in a React Native application.

📝 Pseudocode:
```
Campaign Code Screen
FUNCTION renderCampaignCodeScreen():
    DISPLAY "Campaign Code" title
    DISPLAY campaign code (private and non-editable)
    DISPLAY "This code allows campaign organizers to access key information."
    CREATE "Continue" button (purple)
    IF "Continue" button is pressed:
        NAVIGATE to next screen
```
📌 Notes:
- The campaign code is displayed as read-only.
- The "Continue" button navigates to the next screen.

This ensures a smooth user experience for campaign organizers. 🎯

📌 Pseudocode: Sign-In Screen

This section outlines the pseudocode for implementing a sign-in screen in a React Native application.

📝 Pseudocode:
```
Sign-In Screen
FUNCTION renderSignInScreen():
    DISPLAY "Welcome Back!" title
    DISPLAY "Create an account to get started" subtitle
    CREATE email_input_box
    CREATE password_input_box
    CREATE campaign_code_input_box (optional)
    CREATE "Sign In" button (purple)
    
    DISPLAY "Don't have an account?" text
    CREATE "Sign Up" text (purple, clickable)
    IF "Sign Up" text is pressed:
        NAVIGATE to Sign-Up Screen
    DISPLAY "OR" text
    CREATE "Sign in with Google" button
    CREATE "Sign in with Apple" button
    CREATE "Sign in with Facebook" button
    IF any social login button is pressed:
        AUTHENTICATE user with the respective service
    IF "Sign In" button is pressed:
        IF email and password are valid:
            AUTHENTICATE user
            NAVIGATE to next screen
        ELSE:
            DISPLAY "Invalid credentials" error message
```

📌 Notes:
- Users can sign in using email/password or social login options.
- The "Sign Up" text navigates to the registration screen.
- Authentication logic can be integrated with Firebase, OAuth, or any backend service.

This ensures a seamless sign-in experience. ✅

📌 Pseudocode: Onboarding Screen 1

This section outlines the pseudocode for implementing the first screen of the onboarding process in a React Native application.

📝 Pseudocode:
```
/Onboarding/Onboarding1.js 
Create container:
white background 
 center content
  ADD an image:
    - Image from assets
    - Fit image width (100%) height to 40%
    - Add space below image
  ADD text: "Fundu"
    - Font: medium (16), bold, grey color
    - Add space below title
  ADD text: "Welcome to Fundu! Let's get started..."
    - Font: Large(32), centered, black color
    - Add space below text
  CREATE 3 dots:
    - First dot is dark (active), others are light grey
    - Horizontal spacing between dots
  CREATE button with:
    - Purple background, white text
    - Text: "Next"
    - Padding and border radius (rounded corners)
    - Trigger onPress function when clicked
```
📌 Notes:

- The image takes up 40% of the screen width.
- The text elements are styled with appropriate spacing and alignment.
- The progress indicator uses three dots, with the first being active.
- The "Next" button navigates to the next onboarding screen.

This ensures a smooth onboarding experience for new users. 🚀

Psuedocode for Frontend Components:

📌 Pseudocode: Onboarding Screen 2

This section outlines the pseudocode for implementing the second screen of the onboarding process in a React Native application.

📝 Pseudocode:
```
/Onboarding/Onboarding2.js 
Create container:
white background 
 center content
  ADD text: "Fundu"
    - Font: medium (16), bold, grey color
    - Add space below title
  ADD text: "Welcome to Fundu! Let's get started..."
    - Font: Large(32), centered, black color
    - Add space below text
  CREATE 3 dots:
    - First dot is dark (active), others are light grey
    - Horizontal spacing between dots
ADD an image:
    - Image from assets
    - Fit image width (100%) height to 40%
    - Add space below image
  CREATE button with:
    - Purple background, white text
    - Text: "Next"
    - Padding and border radius (rounded corners)
    - Trigger onPress function when clicked

```

📌 Notes:
- The text elements are styled with appropriate spacing and alignment.
- The progress indicator uses three dots, with the first being active.
- The image takes up 40% of the screen width.
- The "Next" button navigates to the next onboarding screen.

This ensures a seamless onboarding experience for new users. 🚀

📌 Pseudocode: Onboarding Screen 3

This section outlines the pseudocode for implementing the third screen of the onboarding process in a React Native application.

📝 Pseudocode:
```
/Onboarding/Onboarding3.js 
Create container:
white background 
 center content
  ADD an image:
    - Image from assets
    - Fit image width (100%) height to 40%
    - Add space below image
  ADD text: "Fundu"
    - Font: medium (16), bold, grey color
    - Add space below title
  ADD text: "Welcome to Fundu! Let's get started..."
    - Font: Large(32), centered, black color
    - Add space below text
  CREATE 3 dots:
    - First dot is dark (active), others are light grey
    - Horizontal spacing between dots
  CREATE button with:
    - Purple background, white text
    - Text: "Next"
    - Padding and border radius (rounded corners)
    - Trigger onPress function when clicked
```

📌 Notes:
- The image takes up 40% of the screen width.
- The text elements are styled with appropriate spacing and alignment.
- The progress indicator uses three dots, with the first being active.
- The "Next" button navigates to the home screen, completing the onboarding process.

This ensures a seamless onboarding experience for new users. 🚀

📌 Pseudocode: Donor vs. Organization Selection Screen

This section outlines the pseudocode for implementing a screen where the user selects whether they are a donor or an organization member.

📝 Pseudocode:
```
CREATE a container with:
    - White background
    - Content centered vertically and horizontally

  ADD an image at the top:
    - Image source: Logo image from assets
    - Resize to fit container width and maintain aspect ratio

  ADD text with:
    - Content: "Are you a donor or organization member?"
    - Font size: Medium (18)
    - Font weight: Bold
    - Centered alignment

   CREATE a container for the Donor Icon and Text:
    - Icon representing Donor 
    - Text under to icon: "Donor"
    - Add onPress function to register as Donor

  CREATE a container for the Organization Icon and Text:
    - Icon representing Organization 
    - Text next to icon: "Organization Member"
    - Add onPress function to register as Organization Member

CREATE a button with the following properties:
    - Button text: "Continue"
    - Button background color: Purple 
    - Text color: White
    - Text alignment: Center
    - Font size: Medium (18)
    - Font weight: Bold
    - When button is pressed, navigate to the next page or perform an action
```
📌 Notes:
- The user can choose a role by tapping on a visual icon.
- The selection is tracked in state and required before continuing.
- The layout is responsive and clean, ensuring a clear decision path.
- 
This provides a welcoming and intuitive start to user onboarding. ✅

Stripe Integration Setup in Frontend:

Installed the @stripe/stripe-react-native package in our frontend project.

Created the StripeConfig.js file to initialize Stripe in our React Native app with our publishable key.

Set up the Stripe provider to wrap our app, enabling Stripe functionality across our app.

Summary of Next Steps:

Frontend: We’ve already added StripeProvider. Next, we have to add UI components for Stripe like CardForm or CardField.

Backend: Prepare our backend to handle payment intents and webhooks (once our backend is ready).

Testing: Test the entire flow using Stripe’s test mode with the provided test cards.

Once everything is integrated, we can test end-to-end payments with real-world scenarios.

Dependencies for Frontend

For the frontend setup (React Native app), the following dependencies are required:

Node.js: Version 14.x or higher.

npm (Node Package Manager)

Install the frontend dependencies:

This will install all necessary dependencies listed in frontend/package.json.

Psuedocode for Frontend Components:

📌 Pseudocode: Donation Payment Screen

This section outlines the pseudocode for implementing a donation payment screen in a React Native application.

📝 Pseudocod:
```
Donation Payment Screen
FUNCTION renderDonationPaymentScreen():
    DISPLAY "Back Arrow" in the top left corner
    DISPLAY "Donate" text in the top center of the screen
    DISPLAY "Type your amount" text below the title
    CREATE input field below the "Type your amount" text for the user to type in the donation amount
    CREATE a purple "Pay Now" button below the input field
    IF "Pay Now" button is pressed:
        IF a valid amount is entered:
            PROCESS the payment (e.g., redirect to payment gateway or confirmation page)
        ELSE:
            DISPLAY "Please enter a valid amount" message
```
📌 Notes:
- Users can input a numeric donation amount.
- The "Pay Now" button validates the input before proceeding.
- Invalid entries prompt a user-friendly alert.

This screen helps streamline the donation flow and ensures proper input validation. 💳

📌 Pseudocode: Payment Method Screen

This section outlines the pseudocode for implementing a payment method selection screen in a React Native application.

📝 Pseudocode:
```
Payment Method Screen
FUNCTION renderPaymentMethodScreen():
    DISPLAY "Back Arrow" in the top left corner
    DISPLAY "Payment Method" title in the top center of the screen
    DISPLAY "Your Cards" text to the left, below the title
    IF there are existing card details:
        DISPLAY the card details (e.g., last four digits of the card, card type, expiration date)
    CREATE "Add Payment Method" button below the existing card details to allow the user to add a new credit/debit card
    IF "Add Payment Method" button is pressed:
        OPEN a form to add a new credit/debit card (e.g., card number, expiration date, CVV)
    CREATE a purple "Pay Now" button below the "Add Payment Method" button
    IF "Pay Now" button is pressed:
        IF a valid payment method is selected or added:
            PROCESS the payment (e.g., proceed to payment gateway or confirmation page)
        ELSE:
            DISPLAY "Please add a valid payment method" message
```
📌 Notes:
- Displays existing card details if available.
- Provides an option to add a new payment method.
- The "Pay Now" button validates whether a payment method is available before proceeding.

This screen ensures a smooth payment selection and processing experience. 💳✅

📌 Pseudocode: Receipt Screen

This section outlines the pseudocode for implementing a receipt screen in a React Native application.

📝 Pseudocode:
```
Receipt Screen
FUNCTION renderReceiptScreen():
    DISPLAY a blurred background for the screen
    CREATE an icon of a **receipt** with a **check mark** at the top of the screen
    DISPLAY the **price** below the receipt icon (e.g., the total amount paid)
    DISPLAY the text **"Receipt"** below the price
    DISPLAY the **organization name** below the "Receipt" text (this could be the name of the organization or campaign)
    CREATE a **"Go Home"** button below the organization name
    IF "Go Home" button is pressed:
        NAVIGATE to the home screen (or any main screen, such as the Dashboard or Profile)
```
📌 Notes:
- Displays a blurred background for a clean look.
- Shows the total donation amount, organization name, and receipt confirmation.
- The "Go Home" button navigates back to the main app screen.

This ensures a smooth and visually appealing post-payment experience for the user. 🧾✅

📌 Pseudocode: Search Screen

This section outlines the pseudocode for implementing a search screen in a React Native application.

📝 Pseudocode:
```
Search Screen
FUNCTION renderSearchScreen():
    DISPLAY "Back Arrow" in the top left corner
    DISPLAY "Search" text to the right of the back arrow at the top of the screen
    CREATE a search bar below the title for user input (bind to searchQuery)
    IF the search bar is used:
        UPDATE the searchQuery as the user types
    CREATE a Fundraising Categories section below the search bar
    FOR each category in fundraisingCategories:
        DISPLAY the category name with an icon beside it
        IF a category is clicked:
            HIGHLIGHT the clicked category
            DISPLAY icons related to that category
            UPDATE the screen to show items/icons in the selected category
    CREATE a Recent Searches section below the fundraising categories
    IF there are recent searches:
        DISPLAY "Recent Searches" label
        FOR each recent search in recentSearches:
            DISPLAY each recent search as a clickable item
            IF a recent search is clicked:
                UPDATE searchQuery to the selected recent search
                PERFORM search for the selected recent search term
    ELSE:
        DISPLAY "No recent searches" message
    IF searchQuery is not empty:
        PERFORM a search based on the current searchQuery
        DISPLAY the search results below the recent searches section
```
📌 Notes:
- Users can search and see results dynamically as they type.
- Fundraising categories allow filtering by category.
- Recent searches provide a quick way to revisit past queries.
- The search functionality enhances the discoverability of fundraisers and campaigns.

This ensures a smooth and intuitive search experience for users. 🔍✅

📌 Pseudocode: Category Search Screen

This section outlines the pseudocode for implementing a category-based search screen in a React Native application.

📝 Pseudocode:
```
Category Search Screen
FUNCTION renderSearchScreen():
    DISPLAY "Back Arrow" in the top left corner
    DISPLAY "Search" text to the right of the back arrow at the top of the screen

    CREATE a search bar below the title for user input (bind to searchQuery)
    IF the search bar is used:
        UPDATE the searchQuery as the user types

    CREATE a **Fundraising Categories** section below the search bar
    FOR each category in fundraisingCategories:
        DISPLAY the category name with an icon beside it
        IF a category is clicked:
            HIGHLIGHT the clicked category
            UPDATE the current selected category to the clicked category
            DISPLAY the campaigns in the selected category
            NAVIGATE to a new page to show campaigns in that category

    CREATE a **Recent Searches** section below the fundraising categories
    IF there are recent searches:
        DISPLAY "Recent Searches" label
        FOR each recent search in recentSearches:
            DISPLAY each recent search as a clickable item
            IF a recent search is clicked:
                UPDATE searchQuery to the selected recent search
                PERFORM search for the selected recent search term
    ELSE:
        DISPLAY "No recent searches" message

    IF searchQuery is not empty:
        PERFORM a search based on the current searchQuery
        DISPLAY the search results below the recent searches section

FUNCTION renderCampaignsPage(selectedCategory):
    DISPLAY "Back Arrow" to return to the Search Screen

    DISPLAY the **Category Name** at the top of the page (the name of the selected category)

    DISPLAY a list of campaigns related to the selected category
    FOR each campaign in selectedCategory.campaigns:
        DISPLAY the campaign title, description, and an icon or image related to the campaign
        IF a campaign is clicked:
            NAVIGATE to a campaign details page (if applicable)
```
📌 Notes:
- Allows users to search by category and navigate to campaign listings.
- Displays recent searches for easy access to previous queries.
- Categories are clickable, leading to a filtered campaign page.

This enhances the discoverability of fundraisers based on user interests. 🔍✅

📌 Pseudocode: Profile Screen

This section outlines the pseudocode for implementing a user profile screen in a React Native application.

📝 Pseudocode:
```
Profile Screen
FUNCTION renderProfileScreen():
    DISPLAY background image at the top of the screen
    CREATE a circular profile picture below the background image
    DISPLAY "Bio" title below the profile picture
    DISPLAY a paragraph of text below the "Bio" title for the user's bio description
    CREATE a row of pressable icons beneath the bio section:
        ICON 1: "Edit Profile" icon to allow the user to edit their profile details
        ICON 2: "History" icon to view the user's activity history
        ICON 3: "Wallet" icon to access the user's wallet or balance
        ICON 4: "App Support" icon to provide access to app support or help section
    IF any icon is pressed:
        NAVIGATE to the corresponding screen (e.g., Edit Profile, History, Wallet, or App Support)
```
📌 Notes:
- Background and profile images give visual structure to the profile.
- The bio section summarizes the user’s profile.
- A row of icons gives users access to related features quickly.
- Each icon navigates to a dedicated screen when pressed.

This screen enhances user engagement by providing clear access to profile-related actions. 👤✅

📌 Pseudocode: Profile Details Screen

This section outlines the pseudocode for implementing a profile details editing screen in a React Native application.

📝 Pseudocode:
```
Profile details screen
FUNCTION renderProfileDetailsScreen():
    DISPLAY "Back Arrow" in the top left corner
    DISPLAY "Profile Details" text to the right of the back arrow at the top of the screen
    CREATE a circular profile icon/image at the center of the screen
    CREATE a **camera icon** below the profile icon that allows the user to upload a new image or take a photo
    
    IF the camera icon is pressed:
        OPEN the device's camera roll or camera to choose or take a new profile picture
    BELOW the profile image and camera icon:
        CREATE a box labeled **"First Name"** to input the user's first name
        CREATE a box labeled **"Last Name"** to input the user's last name
        CREATE a box labeled **"Phone Number"** to input the user's phone number
        CREATE a box labeled **"Email"** to input the user's email address
        
    IF any input field is filled:
        UPDATE the respective user profile field accordingly
    
    CREATE a **Save** button at the bottom of the screen for saving profile details
    IF the **Save** button is pressed:
        VALIDATE the input data (ensure all fields are filled out correctly)
        IF all fields are valid:
            SAVE the profile details (store the updated information)
            DISPLAY a success message (e.g., "Profile Updated Successfully")
        ELSE:
            DISPLAY an error message (e.g., "Please fill out all fields correctly")
```

📌 Notes:
- Enables users to update their personal info and upload profile pictures.
- Validates fields and gives feedback via alerts.
- Uses expo-image-picker for camera/gallery access.

This screen personalizes user profiles and improves user control. 👤📸✅

