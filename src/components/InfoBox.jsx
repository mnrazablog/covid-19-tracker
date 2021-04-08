import React from 'react'

import { Card,CardContent, Typography } from '@material-ui/core';

function InfoBox({title,cases,total}) {
    return (
     <Card className="infoBox">
        <CardContent>
             {/* Title  Coronavirus Cases */}
            <Typography className="infoBox__title" color="textSecondary">
                {title}
            </Typography>
             {/* No. Of Cases 123442 */}
            <h2 className="infoBox__cases">{cases}</h2>
             {/* 1.2 M Total */}
             <Typography className="infoBox__total" color="textSecondary">
                 {total} Total
             </Typography>
         </CardContent>
     </Card>
    )
}

export default InfoBox
