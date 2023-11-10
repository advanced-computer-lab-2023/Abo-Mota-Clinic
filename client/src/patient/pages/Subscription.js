import PackageCard from '../components/PackagesCard'


    const basicPackage = {
        type: "Basic",
        title: "BASIC",
        price: "$59",
        features: ['✓ Feature 1', '✓ Feature 2', '✗ Feature 3'],
        expiryDate: "12/31/2024"
    };

    const standardPackage = {
        type: "Standard",
        title: "STANDARD",
        price: "$69",
        features: ['✓ Feature 1', '✓ Feature 2', '✓ Feature 3'],
        expiryDate: "12/31/2024"
    };

    const premiumPackage = {
        type: "Premium",
        title: "PREMIUM",
        price: "$99",
        features: ['✓ Feature 1', '✓ Feature 2', '✓ Feature 3'],
        expiryDate: "12/31/2024"
    };

    

export default function Subscription() {
    // Define a gradient background style
    const gradientStyle = {
        background: 'linear-gradient(to right, #e6f1ff, #cce0ff)', 
        color: '#333', 
    };
    const headerStyle = {
        textAlign: 'center', 
        color: '#2c3e50', 
    };

    

     

    return (
        <section style={{ ...gradientStyle, maxWidth: '1536px', width: '100%' }} className="border-2 border-gray-300 rounded-lg mx-auto my-8 p-4">
            <div className="mb-8">
                <h2 style={headerStyle} className="text-2xl font-bold mb-4" >Your Packages</h2>
                <div className="flex justify-center items-center flex-wrap">
                    <PackageCard pack={basicPackage} />
                </div>
            </div>
            <h2 style={headerStyle} className="text-2xl font-bold mb-4" >Family Packages</h2>
            <div className="flex justify-center items-center flex-wrap">
                <PackageCard pack={standardPackage} />
                <PackageCard pack={premiumPackage} />
            </div>
        </section>
    );
}

