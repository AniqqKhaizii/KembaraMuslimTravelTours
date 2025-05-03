import pool from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		// Example: getting parameters from query string (optional)
		const { searchParams } = new URL(req.url);
		const p_Operation = searchParams.get("Operation");
		const p_BookID = searchParams.get("BookID") || null;
		const p_PakejID = null;
		const o_CustID = null;
		const p_TripID = null;
		const p_Pax = null;
		const p_TotalPax = null;
		const p_Discount = null;
		const p_DepoAmt = null;
		const p_BalancePayment = null;
		const p_TotalAmt = null;
		const p_Status = null;
		const p_BookDate = null;
		const p_PaidDate = null;
		const p_BillCode = null;
		const p_OrderID = null;
		const p_TransactionID = null;
		const p_ReferralCode = null;
		const p_SalesID = null;

		const [rows] = await pool.query(
			`CALL SP_Manage_Booking(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				p_Operation,
				p_BookID,
				p_PakejID,
				o_CustID,
				p_TripID,
				p_Pax,
				p_TotalPax,
				p_Discount,
				p_DepoAmt,
				p_BalancePayment,
				p_TotalAmt,
				p_Status,
				p_BookDate,
				p_PaidDate,
				p_BillCode,
				p_OrderID,
				p_TransactionID,
				p_ReferralCode,
				p_SalesID,
			]
		);

		// Return the first result set if multiple are returned
		return NextResponse.json(rows[0] ?? []);
	} catch (error) {
		console.error("❌ ERROR:", error);
		return NextResponse.json(
			{ error: { message: error.message } },
			{ status: 500 }
		);
	}
}

export async function POST(req) {
	try {
		const requestBody = await req.json();

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
			p_Pax,
			p_TotalPax,
			p_Discount,
			p_DepoAmt,
			p_BalancePayment,
			p_TotalAmt,
			p_Status,
			p_BookDate,
			p_PaidDate,
			p_BillCode,
			p_OrderID,
			p_TransactionID,
			p_AddOnCustDetails,
			p_ReferralCode,
			p_SalesID,
		} = requestBody;

		if (!p_Operation) {
			return NextResponse.json(
				{ message: "Missing required field: p_Operation" },
				{ status: 400 }
			);
		}
		if (!p_BookID) {
			return NextResponse.json(
				{ message: "Missing required field: p_BookID" },
				{ status: 400 }
			);
		}
		if (!p_PakejID) {
			return NextResponse.json(
				{ message: "Missing required field: p_PakejID" },
				{ status: 400 }
			);
		}
		if (!p_TripID) {
			return NextResponse.json(
				{ message: "Missing required field: p_TripID" },
				{ status: 400 }
			);
		}
		if (
			!p_CustID ||
			!p_CustName ||
			!p_CustEmail ||
			!p_CustAddress ||
			!p_CustPhone
		) {
			return NextResponse.json(
				{ message: "Missing required field: Customer Details" },
				{ status: 400 }
			);
		}
		if (p_DepoAmt == null && p_TotalAmt == null) {
			return NextResponse.json(
				{ message: "Either p_DepoAmt or p_TotalAmt must be provided" },
				{ status: 400 }
			);
		}

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

		const bookingQuery = `
      CALL SP_Manage_Booking(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
		const [bookingResult] = await pool.query(bookingQuery, [
			"ADD_NEW",
			p_BookID,
			p_PakejID,
			o_CustID,
			p_TripID,
			p_Pax,
			p_TotalPax,
			p_Discount,
			p_DepoAmt,
			p_BalancePayment,
			p_TotalAmt,
			p_Status,
			p_BookDate,
			p_PaidDate,
			p_BillCode,
			p_OrderID,
			p_TransactionID,
			p_ReferralCode,
			p_SalesID,
		]);

		const o_BookID = bookingResult[1][0]?.BookID;

		if (!o_BookID) {
			return NextResponse.json(
				{ message: "Error storing booking data sadsadasda" },
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
		return NextResponse.json({ message: error }, { status: 500 });
	}
}
