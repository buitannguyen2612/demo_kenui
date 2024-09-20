import { useCallback, useEffect, useState } from 'react';

const useViewPortWith = () => {
    // Khởi tạo giá trị chiều rộng màn hình
    const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

    // Hàm cập nhật chiều rộng màn hình
    const setSize = useCallback(() => {
        const currentWidth = window.innerWidth;
        // Chỉ cập nhật state khi chiều rộng thay đổi
        setWidth(prevWidth => (prevWidth !== currentWidth ? currentWidth : prevWidth));
    }, []);

    useEffect(() => {
        // Thêm event listener khi component mount
        window.addEventListener('resize', setSize, { passive: true });
        window.addEventListener('orientationchange', setSize, { passive: true });

        // Cleanup event listener khi component unmount
        return () => {
            window.removeEventListener('resize', setSize);
            window.removeEventListener('orientationchange', setSize);
        };
    }, [setSize]);

    return width;
}
export default useViewPortWith