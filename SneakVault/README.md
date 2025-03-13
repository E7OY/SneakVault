### Step 1: Extend UserContext

Assuming you have a `UserContext`, you can extend it to include an `isAdmin` property.

```tsx
// context/userContext.tsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User object should include isAdmin property

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
```

### Step 2: Create Admin Route

In your routing setup, add a route for the admin upload page.

```tsx
// App.tsx or your main routing file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AdminUpload } from './routes/AdminUpload';
import { useUser } from './context/userContext';

function App() {
    const { user } = useUser();

    return (
        <Router>
            <Routes>
                {/* Other routes */}
                {user && user.isAdmin && <Route path="/admin/upload" element={<AdminUpload />} />}
            </Routes>
        </Router>
    );
}
```

### Step 3: Create the Admin Upload Component

Create a new component for the admin upload functionality.

```tsx
// routes/AdminUpload.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminUpload() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const navigate = useNavigate();

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('image', productImage);

        // Replace with your API endpoint
        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            // Handle success (e.g., redirect or show a success message)
            navigate('/admin/products'); // Redirect to the products list or admin dashboard
        } else {
            // Handle error
            console.error('Upload failed');
        }
    };

    return (
        <div>
            <h2>Upload Product</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Price:</label>
                    <input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
```

### Step 4: Handle Product Upload

In the `handleUpload` function, you can send the product data to your backend API. Make sure your backend is set up to handle this request.

### Step 5: Protect the Route

The route is already protected by checking if the user is an admin before rendering the `AdminUpload` component.

### Conclusion

With these steps, you have created an admin view that allows users with admin privileges to upload products. Make sure to test the functionality and handle any errors appropriately. You may also want to add validation and feedback for the user during the upload process.