const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserTemplate = require("./models/UserTemplate");
const User = require("./models/User");

dotenv.config();

const testDBSave = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected! ✅");

        // Find a test user
        const user = await User.findOne();
        if (!user) {
            console.error("No user found in database. Please create a user first.");
            process.exit(1);
        }

        console.log(`Testing save for user: ${user.email}`);

        const templateId = "business-1";
        const testData = { title: "Test Title", description: "Test Description" };

        let userTemplate = await UserTemplate.findOne({ userId: user._id, templateId });

        if (userTemplate) {
            console.log("Template already exists. Updating...");
            userTemplate.data = testData;
            await userTemplate.save();
            console.log("Template updated! ✅");
        } else {
            console.log("Creating new template record...");
            userTemplate = await UserTemplate.create({
                userId: user._id,
                templateId,
                data: testData,
            });
            console.log("Template created! ✅");
        }

        // Verify retrieval
        const retrieved = await UserTemplate.findOne({ userId: user._id, templateId });
        console.log("Retrieved data:", retrieved.data);

        if (JSON.stringify(retrieved.data) === JSON.stringify(testData)) {
            console.log("Verification successful! 🎉");
        } else {
            console.log("Verification failed! ❌ Data mismatch.");
        }

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

testDBSave();
