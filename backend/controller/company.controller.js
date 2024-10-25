import { Company } from "../schemas/company.model.js";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        console.log({companyName})
        // Check if the company name is provided
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        // Check if the user is a recruiter
        if (req.role !== "recruiter") {
            return res.status(403).json({
                message: "Only recruiters can register a company",
                success: false
            });
        }

        // Check if the company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already registered",
                success: false
            });
        }

        // Create the company (await the creation process)
        company = await Company.create({
            name: companyName,
            userId: req.id  // Assuming req.id is set by your authentication middleware
        });

        // Return success response with company details
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error("Error registering company:", error);
        return res.status(500).json({
            message: "An error occurred while registering the company",
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id
        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Validate companyId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid Company ID",
                success: false
            });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company Not Found",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });

    } catch (error) {
        console.error("Error fetching company:", error);
        return res.status(500).json({
            message: "Server Error. Unable to fetch company.",
            success: false,
            error: error.message // Sending the error message for easier debugging
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        // Destructure the body and the file from the request
        const { name, description, website, location } = req.body;
        const file = req.file;
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url;
        // Prepare the update data only with provided values
        const updateData = { name, description, website, location, logo };
        console.log(updateData)

        // Find and update the company by its ID
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        // If company is not found, return a 404 response
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        // Return success response
        return res.status(200).json({
            message: "Company information updated successfully",
            company, // Optionally return the updated company data
            success: true
        });
        
    } catch (error) {
        // Log and return server error response
        console.error("Error updating company:", error);
        return res.status(500).json({
            message: "An error occurred while updating company information",
            success: false
        });
    }
};
