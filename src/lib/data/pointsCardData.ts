export interface PointsCard {
    title: string;
    icon:string;
    description: string;
    annotation: string;
}



export const pointsCardData: PointsCard[] = [
        {
            title : "Shop & Earn",
            icon:"clarity:shopping-bag-line",
            description : "Earn 1 point for every $1 spent",
            annotation: "Qualifying purchases only"
        },

        {
            title: "Create an Account",
            icon : "hugeicons:user",
            description: "Get 100 points just for signing up.",
            annotation: "One-time bonus per email"

        },

        {
            title: "Write a Review",
            icon : "hugeicons:user",
            description: "Earn 25 points per product review.",
            annotation: "Purchases only"
        },

        {
            title : "Birthday Bonus",
            icon : "fe:birthday-cake",
            description : "Receive 200 bonus points on your birthday",
            annotation: "Add birthdate in profile"
        },

        {
            title : "Refer a Friend",
            icon : "ix:reference",
            description : "Get 500 points when your friend makes a purchase",
            annotation: "Friend must use your referral link"
        },

        {
            title : "Follow Us",
            icon : "simple-line-icons:social-instagram",
            description : "Earn 50 points each for following on Instagram or Facebook.",
            annotation: "Max 100 points total"
        }
    ];