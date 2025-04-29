import pool from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
	try {
		const requestBody = await req.json();
		console.log("Parsed Request Body:", requestBody);

		const {
			p_Operation,
			p_BookID,
			p_CustName,
			p_CustID,
			p_CustEmail,
			p_CustAddress,
			p_CustPhone,
			p_PakejID,
			p_TripID,
			p_TotalPax,
			p_Discount,
			p_DepoAmt,
			p_BalancePayment,
			p_TotalAmt,
			p_isPaid,
			p_BookDate,
			p_PaidDate,
			p_BillCode,
			p_OrderID,
			p_TransactionID,
			p_AddOnCustDetails,
			p_ReferralCode,
		} = requestBody;

		// Step 1: Store customer details
		const customerQuery = `
      CALL SP_Manage_Customers(?, ?, ?, ?, ?, ?, ?)
    `;
		const [customerResult] = await pool.query(customerQuery, [
			p_Operation,
			p_CustID,
			p_CustName,
			p_CustEmail,
			p_CustAddress,
			p_CustPhone,
			null,
		]);
		const o_CustID = customerResult[0][0]?.Cust_ID;
		const o_ReferralCode = customerResult[0]?.ReferralCode;
		if (!o_CustID) {
			return NextResponse.json(
				{ message: "Error storing customer data" },
				{ status: 400 }
			);
		}

		// Step 2: Store booking details
		const bookingQuery = `
      CALL SP_Manage_Booking(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
		const [bookingResult] = await pool.query(bookingQuery, [
			"ADD_NEW",
			p_BookID,
			p_PakejID,
			o_CustID, // Using the generated CustID
			p_TripID,
			p_TotalPax,
			p_Discount,
			p_DepoAmt,
			p_BalancePayment,
			p_TotalAmt,
			p_isPaid,
			p_BookDate,
			p_PaidDate,
			p_BillCode,
			p_OrderID,
			p_TransactionID,
			p_ReferralCode,
		]);
		console.log("bookingResult", bookingResult);

		const o_BookID = bookingResult[0][0]?.BookID;
		console.log("o_BookID", o_BookID);

		if (!o_BookID) {
			return NextResponse.json(
				{ message: "Error storing booking data" },
				{ status: 400 }
			);
		}

		// Step 3: Store add-on customer details if provided
		if (p_AddOnCustDetails && p_AddOnCustDetails.length > 0) {
			const addOnCustQuery = `
        CALL SP_Manage_AddOn_Cust(?, ?, ?)
      `;
			const [addOnCustResult] = await pool.query(addOnCustQuery, [
				o_BookID,
				o_CustID,
				p_AddOnCustDetails, // Convert array to JSON
			]);

			if (addOnCustResult.length > 0) {
				return NextResponse.json(
					{
						message: "Booking and add-on customers added successfully",
						o_BookID,
					},
					{ status: 200 }
				);
			} else {
				return NextResponse.json(
					{ message: "Error storing add-on customer data" },
					{ status: 400 }
				);
			}
		}

		return NextResponse.json(
			{
				message: "Booking added successfully",
				o_BookID,
				o_CustID,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("❌ ERROR:", error);
		return NextResponse.json(
			{ error: { message: error.message } },
			{ status: 500 }
		);
	}
}
