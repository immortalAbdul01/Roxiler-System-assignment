import Transaction from "../model/transactionSchema.js";

export const statistics = async (req, res) => {
  try {
    const month = parseInt(req.query.month) || 3;

    if (isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({ message: "Invalid month" });
    }

    const stats = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
        },
      },
      {
        $group: {
            _id:null,
          totalSaleAmount: { $sum: { $cond: ["$sold", "$price", 0] } },
          totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } },
        },
      },
    ]);

    const result = stats[0] || {
      totalSaleAmount: 0,
      totalSoldItems: 0,
      totalNotSoldItems: 0,
    };

    res.status(200).json({
      month,
      data:result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
