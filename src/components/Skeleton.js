import classNames from "classnames";

function Skeleton({ times, className }){  //例 times=3
    const outerClassNames = classNames(
        'relative',
        'overflow-hidden',
        'bg-gray-200',
        'rounded',
        'mb-2.5',
        className
    );
    const innerClassNames = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full',
        'bg-gradient-to-r',
        'from-gray-200',
        'via-white',
        'to-gray-200'
    );
    
    const boxes = Array(times)  //[undefined,undefined,undefined]
        .fill(0)                //[0,0,0]
        .map((_, i)=>{
            return <div key={i} className={outerClassNames}>
                <div className={innerClassNames}/>
            </div>
        });

    return boxes;
};

export default Skeleton;