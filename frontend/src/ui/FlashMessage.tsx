import { SVGProps } from "react"


interface Props extends SVGProps<SVGSVGElement> {
    isSuccessful: boolean,
    text: string
}


export default function FlashMessage({ isSuccessful, text, ...props}: Props) {
	return (
		<div className='flashMessage'>
			<div className='flashMessageIcon'>
				{isSuccessful ? (
					<div className='text-green-400'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='100%'
							height='100%'
							viewBox='0 0 512 512'
							{...props}
						>
							{/* Icon from Siemens Industrial Experience Icons by Siemens AG - https://github.com/siemens/ix-icons/blob/main/LICENSE.md */}
							<path
								fill='currentColor'
								fillRule='evenodd'
								d='m283.735 52.918l31.295 26.614a42.7 42.7 0 0 0 24.213 10.03l40.947 3.309c20.86 1.686 37.42 18.246 39.106 39.106l3.31 40.947a42.7 42.7 0 0 0 10.029 24.213l26.614 31.294c13.557 15.942 13.557 39.362 0 55.304l-26.614 31.295a42.7 42.7 0 0 0-10.03 24.213l-3.31 40.947c-1.685 20.86-18.246 37.42-39.105 39.106l-40.947 3.31a42.7 42.7 0 0 0-24.213 10.029l-31.295 26.614c-15.942 13.557-39.362 13.557-55.304 0l-31.294-26.614a42.7 42.7 0 0 0-24.213-10.03l-40.947-3.31c-20.86-1.685-37.42-18.246-39.106-39.105l-3.31-40.947a42.7 42.7 0 0 0-10.03-24.213l-26.613-31.295c-13.557-15.942-13.557-39.362 0-55.304l26.614-31.294a42.7 42.7 0 0 0 10.03-24.213l3.309-40.947c1.686-20.86 18.246-37.42 39.106-39.106l40.947-3.31a42.7 42.7 0 0 0 24.213-10.03l31.294-26.613c15.942-13.557 39.362-13.557 55.304 0m52.6 126.863L234.667 282.002l-48.916-48.916l-30.167 30.166l79.083 79.084l131.836-132.388z'
							/>
						</svg>
					</div>
				) : (
					<div className='text-red-500'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='100%'
							height='100%'
							viewBox='0 0 24 24'
							{...props}
						>
							{/* Icon from WeUI Icon by WeUI - undefined */}
							<path
								fill='currentColor'
								fillRule='evenodd'
								d='m11.998 4.4l-8.92 15.454l17.843-.001zM2.732 21.054a1 1 0 0 1-.866-1.5L11.132 3.5a1 1 0 0 1 1.732 0l9.27 16.053a1 1 0 0 1-.866 1.5zm8.64-11.1h1.255l-.097 4.722h-1.06l-.097-4.722zm.626 7.144a.696.696 0 0 1-.708-.694c0-.385.312-.688.708-.688c.4 0 .712.303.712.688a.697.697 0 0 1-.712.694'
							/>
						</svg>
					</div>
				)}
			</div>
            <h2>{text}</h2>
		</div>
	)
}
