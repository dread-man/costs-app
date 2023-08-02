import React from "react";
import { CostHeader } from "./CostHeader/CostHeader";

import styles from './CostsPage.module.scss'

export const CostsPage: React.FC = () => {
	return (	
		<div className="container">
			<h2 className={styles.mainTitle}>My Costs</h2>
			<CostHeader costs={[]}/>
		</div>
	)
}