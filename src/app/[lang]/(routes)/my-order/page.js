'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import GlobalApi from '../../_utils/GlobalApi';
import Loader from '../../_components/Loader';

export default function MyOrder() {
    const router = useRouter();
    const [orderData, setOrderData] = useState([]);
    const [jwt, setJwt] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedJwt = sessionStorage.getItem('jwt');
        const storedUser = JSON.parse(sessionStorage.getItem('user'));

        if (!storedJwt) {
            router.replace('/');
            return;
        }

        const getMyOrder = async (userId, jwtToken) => {
            try {
                setLoading(true);
                const orderList = await GlobalApi.getMyOrder(userId, jwtToken);
                console.log("Fetched order list:", orderList);
                setOrderData(orderList);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        getMyOrder(storedUser.id, storedJwt);
    }, [router]);

    const getStatusColor = useCallback((status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'dispatched':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Order History</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orderData.length > 0 ? (
                            orderData.map((order, index) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            {order.orderItemList.map((item, index) => (
                                                <div key={index} className="flex items-center space-x-4">
                                                    <img
                                                        src={item.product.data.attributes.images.data[0].attributes.url}
                                                        alt={item.product.data.attributes.title}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{item.product.data.attributes.title}</p>
                                                        <p className="text-sm text-gray-500">${item.product.data.attributes.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.orderItemList.map((item) => item.quantity)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${order.totalOrderAmount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
