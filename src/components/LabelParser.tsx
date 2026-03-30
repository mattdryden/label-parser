import { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from "react-to-print";
import csv from 'csvtojson';

import './LabelParser.css';

interface Props {
    searchText?: string;
}

const LabelParser = (props: Props) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedCard, setSelectedCard] = useState({
        "Shipping Name": "",
        "Shipping Address 1": "",
        "Shipping Address 2": "",
        "Shipping City": "",
        "Shipping Zip": "",
        "Shipping County": "",
        "Shipping Country": "",
    });

    console.log(orders);

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    useEffect(() => {
        reactToPrintFn()
    }, [selectedCard]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length) {
            const file = files[0];

            // Use FileReader to read the file content
            const reader = new FileReader();
            reader.onload = async (e) => {
                const csvData = e.target?.result as string;
                try {
                    const json = await csv().fromString(csvData);
                    setOrders(json);
                } catch (error) {
                    console.error('Error parsing CSV:', error);
                }
            };

            reader.readAsText(file);
        }
    }

    const getOrderCards = () => {
        const orderCards: any[] = [];
        const lowerSearch = props.searchText?.toLowerCase();

        orders.forEach((order, index) => {
            const hasSearchMatch = (
                order["Shipping Name"].toLowerCase().includes(lowerSearch) ||
                order["Email"].toLowerCase().includes(lowerSearch)
            );

            if (order["Shipping Name"] && hasSearchMatch) {
                orderCards.push(
                    <div
                        key={`${order["Email"]}-${index.toString()}`}
                        className='order-card'
                        onClick={() => setSelectedCard(order)}
                    >
                        <div>{order["Shipping Name"]}</div>
                        <div>{order["Email"]}</div>
                    </div>
                );
            }
        });

        return orderCards;
    }

    if (orders.length === 0) {
        return (
            <div className='no-content'>
                <div className="file-upload">
                    <input
                        type="file"
                        id="fileInput"
                        className="file-input"
                        onChange={handleFileChange}
                        multiple={false}
                    />
                    <label htmlFor="fileInput" className="file-label">
                        Drag & Drop files here or click to upload
                    </label>
                </div>
            </div>
        );
    }

    return (
        <div className='order-cards'>
            {getOrderCards()}
            <div className="offscreen" >
                <div ref={contentRef} className='label-container'>
                    <div className='left-align'>
                        <div>{selectedCard["Shipping Name"]}</div>
                        <div>{selectedCard["Shipping Address 1"]}</div>
                        <div>{selectedCard["Shipping Address 2"]}</div>
                        <div>{selectedCard["Shipping City"]}</div>
                        <div>{selectedCard["Shipping Zip"]}</div>
                        <div>{selectedCard["Shipping County"]}</div>
                        <div>{selectedCard["Shipping Country"]}</div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default LabelParser;
