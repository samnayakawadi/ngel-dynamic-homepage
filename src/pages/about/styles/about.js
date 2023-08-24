import styled from "styled-components";

export const Styles = styled.div`
    .about-page {
        .icon-box-area {
            padding-bottom : 72px;
            .full-icon-box {
                .icon-box {
                    position: inherit;
                    top: 0;
                    left: 0;
                    width: unset;
                }
            }

            @media(max-width: 767px) {
                padding: 0 0 10px;
            }
        }
    }
`;