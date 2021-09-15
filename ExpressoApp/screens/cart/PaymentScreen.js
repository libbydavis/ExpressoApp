/*
import React, {useEffect} from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

const PaymentScreen = ({navigation}) => {
    const [publishableKey, setPublishableKey] = useState('');

    const fetchPublishableKey = async () => {
        const key = await fetchKey(); // fetch key from your server here
        setPublishableKey(key);
    };

    useEffect(() => {
        fetchPublishableKey();
    }, []);

    return (
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier"
        >
            // Your app code here
        </StripeProvider>
    );
}

export default PaymentScreen;

 */
