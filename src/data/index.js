import { v4 } from 'uuid';

export const TICKET_TYPES = {
    1: 'Day of Show'
}

export const DELIVERY_OPTIONS = {
    1: {
        display: 'Mobile',
        description: `Your phone's your ticket. Locate your tickets in your account - or in your app. When you go mobile, your tickets will not be emailed to you or available for print.`
    }
}

export const EVENTS = [
    {
        _id: 'a50f8fc8-1fe0-4ae6-b99e-3c18cfae2192',
        image: 'https://placehold.co/305x225',
        imagePreview: 'https://placehold.co/82x46',
        dateObject: {
            date: 'JUN 28', 
            day: 'Fri', 
            time: '9:00pm',
        },
        ticketLimit: 2,
        agePolicy: 'All Ages',
        title: 'The Soul II Soul Tour', 
        address:'The Theater at MSG - New York, NY',
        status: 'cancelled',
        ticket: {
            deliveryOptions: [1],
            rawPrice: 24.00,
            fees: 3.00,
            totalPrice: 27.00,
            type: 1
        }
    },
    {
        _id: 'ec5b8e75-602a-4b8c-bad2-31931145137e',
        image: 'https://placehold.co/305x225',
        imagePreview: 'https://placehold.co/82x46',
        dateObject: {
            date: 'JUL 17', 
            day: 'Mon', 
            time: '8:00pm',
        },
        ticketLimit: 3,
        agePolicy: 'All Ages',
        title: 'Say Something Funny!', 
        address:'Mercury Lounge - New York, NY',
        ticket: {
            deliveryOptions: [1],
            rawPrice: 21.00,
            fees: 2.00,
            totalPrice: 23.00,
            type: 1
        }
    },
    {
        _id: 'ac5b22a7-ffb0-43e2-9670-973ac72640da',
        image: 'https://placehold.co/305x225',
        imagePreview: 'https://placehold.co/82x46',
        dateObject: {
            date: 'AUG 22', 
            day: 'Tues', 
            time: '9:00pm',
        },
        ticketLimit: 4,
        agePolicy: '18+',
        title: 'Greg Puciato', 
        address:'Gramercy Theatre - New York, NY',
        ticket: {
            deliveryOptions: [1],
            rawPrice: 15.00,
            fees: 12.25,
            totalPrice: 27.25,
            type: 1
        }
    },
    {   
        _id: '71fbaa33-b22b-44b7-80c4-3f8e66e5ee9a',
        image: 'https://placehold.co/305x225',
        imagePreview: 'https://placehold.co/82x46',
        dateObject: {
            date: 'DEC 31', 
            day: 'Sat', 
            time: '7:30pm',
        },
        title: 'AMEX SSO Text Event', 
        address:'EXPAPP Venue - NY4 - New York, NY',
        ticketLimit: 4,
        agePolicy: '18+',
        ticket: {
            deliveryOptions: [1],
            rawPrice: 15.00,
            fees: 6.25,
            totalPrice: 21.25,
            type: 1
        }
    },
]

export const CARDS = [{
    _id: v4(),
    cardHolderName: 'John Smith',
    cardNumber: '1111 1111 1111',
    expirationDate: '06/24',
    securityCode: '123',
    country: 'United States',
    address: 'Test Address',
    addressLine2: '',
    city: 'New York',
    state: 'New York',
    postalCode: '11201',
    phone: '(111) 111-1111'
}]