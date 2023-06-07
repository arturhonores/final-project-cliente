import { useState } from "react";
import ExpensesList from "../components/ExpensesList"

const TabsCategoryExpenses = ({ expenses }) => {
    const [openTab, setOpenTab] = useState(1);

    return (
        <>
            <div className="flex flex-wrap w-full">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-lg block leading-normal " +
                                    (openTab === 1
                                        ? "text-white bg-verde-oscuro"
                                        : "text-verde-oscuro bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Mes
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 2
                                        ? "text-white bg-verde-oscuro"
                                        : "text-verde-oscuro bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Período
                            </a>
                        </li>
                    </ul>
                    {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded z-10"> */}
                    <div className="relative flex flex-col min-w-0 w-full mb-6 z-10">
                        <div className="px-4 py-5 flex-auto bg-red-500 w-full">
                            <div className={openTab === 1 ? "block w-full" : "hidden"} id="link1">
                                {/* <p className="h-72">
                                        Collaboratively administrate empowered markets via
                                        plug-and-play networks. Dynamically procrastinate B2C users
                                        after installed base benefits.
                                        <br />
                                        <br /> Dramatically visualize customer directed convergence
                                        without revolutionary ROI.
                                    </p> */}
                                <div className="w-full block">
                                    <ExpensesList expenses={expenses}></ExpensesList>
                                </div>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <p className="h-72">
                                    Completely synergize resource taxing relationships via
                                    premier niche markets. Professionally cultivate one-to-one
                                    customer service with robust ideas.
                                    <br />
                                    <br />
                                    Dynamically innovate resource-leveling customer service for
                                    state of the art customer service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TabsCategoryExpenses