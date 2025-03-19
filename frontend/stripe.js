// Import the StripeProvider from the stripe-react-native package
import { StripeProvider } from '@stripe/stripe-react-native';

// Define the Stripe publishable key 
const stripePublishableKey = 'pk_test_51R4QorBtpMkPB0tLCifen9sGVrEHQWcqmJeIDuXDeAMEmUgwBK665hFFInnnCLR5hNd0a3Mv9fIP8xRyDoJU8gFS00iArTP4W1'; 

// Create a component that will wrap the entire app or specific sections that need Stripe functionality
const StripeConfig = ({ children }) => {
  return (
    // StripeProvider component makes Stripe available to all children components inside it
    <StripeProvider publishableKey={stripePublishableKey}>
      {children} {/* This will render all components inside the StripeConfig */}
    </StripeProvider>
  );
};

// Export the StripeConfig so it can be used in the main app
export default StripeConfig;

